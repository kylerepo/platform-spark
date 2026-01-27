-- Fix the overly permissive system_analytics INSERT policy
DROP POLICY IF EXISTS "System can insert analytics" ON public.system_analytics;

-- Only allow authenticated users or service role to insert analytics
CREATE POLICY "Authenticated can insert analytics" ON public.system_analytics 
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL OR auth.role() = 'service_role');

-- Also fix the platform_settings SELECT policy to be more specific
DROP POLICY IF EXISTS "Users can view settings" ON public.platform_settings;
CREATE POLICY "Authenticated users can view settings" ON public.platform_settings 
FOR SELECT USING (auth.uid() IS NOT NULL);

-- Fix storage processed bucket policy
DROP POLICY IF EXISTS "System can upload processed files" ON storage.objects;
CREATE POLICY "Authenticated can upload processed files" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'watermark-processed' AND auth.uid() IS NOT NULL);