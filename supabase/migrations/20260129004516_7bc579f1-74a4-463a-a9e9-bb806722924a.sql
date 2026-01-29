-- Enable realtime for watermark_jobs table to track processing progress
ALTER PUBLICATION supabase_realtime ADD TABLE public.watermark_jobs;