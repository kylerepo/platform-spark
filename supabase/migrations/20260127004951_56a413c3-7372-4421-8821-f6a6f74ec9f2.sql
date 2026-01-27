-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create enum for ticket status
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- Create enum for watermark job status
CREATE TYPE public.watermark_job_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create support_tickets table
CREATE TABLE public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status ticket_status DEFAULT 'open',
    priority TEXT DEFAULT 'medium',
    assigned_to UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create platform_settings table for admin configuration
CREATE TABLE public.platform_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create watermark_templates table
CREATE TABLE public.watermark_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    watermark_type TEXT DEFAULT 'invisible_qr',
    strength INTEGER DEFAULT 70,
    position TEXT DEFAULT 'center',
    audio_watermark BOOLEAN DEFAULT true,
    add_timestamp BOOLEAN DEFAULT true,
    custom_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create watermark_jobs table
CREATE TABLE public.watermark_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.watermark_templates(id),
    job_name TEXT NOT NULL,
    status watermark_job_status DEFAULT 'pending',
    total_files INTEGER DEFAULT 0,
    processed_files INTEGER DEFAULT 0,
    settings JSONB,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create watermark_files table
CREATE TABLE public.watermark_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES public.watermark_jobs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    original_file_path TEXT NOT NULL,
    watermarked_file_path TEXT,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT,
    status watermark_job_status DEFAULT 'pending',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create system_analytics table for admin dashboard
CREATE TABLE public.system_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_type TEXT NOT NULL,
    metric_value NUMERIC NOT NULL,
    metadata JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watermark_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watermark_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watermark_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_analytics ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for support_tickets
CREATE POLICY "Users can view own tickets" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create tickets" ON public.support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tickets" ON public.support_tickets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all tickets" ON public.support_tickets FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for platform_settings
CREATE POLICY "Admins can manage settings" ON public.platform_settings FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view settings" ON public.platform_settings FOR SELECT USING (true);

-- RLS Policies for watermark_templates
CREATE POLICY "Users can manage own templates" ON public.watermark_templates FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for watermark_jobs
CREATE POLICY "Users can manage own jobs" ON public.watermark_jobs FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for watermark_files
CREATE POLICY "Users can manage own files" ON public.watermark_files FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for system_analytics
CREATE POLICY "Admins can view analytics" ON public.system_analytics FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "System can insert analytics" ON public.system_analytics FOR INSERT WITH CHECK (true);

-- Create storage buckets for watermarking
INSERT INTO storage.buckets (id, name, public) VALUES ('watermark-originals', 'watermark-originals', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('watermark-processed', 'watermark-processed', false);

-- Storage policies for watermark-originals
CREATE POLICY "Users can upload own originals" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'watermark-originals' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own originals" ON storage.objects FOR SELECT USING (bucket_id = 'watermark-originals' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own originals" ON storage.objects FOR DELETE USING (bucket_id = 'watermark-originals' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for watermark-processed
CREATE POLICY "Users can view own processed files" ON storage.objects FOR SELECT USING (bucket_id = 'watermark-processed' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "System can upload processed files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'watermark-processed');

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Timestamp triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();