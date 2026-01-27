import { useState, useEffect } from "react";
import { Download, Clock, CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Job {
  id: string;
  job_name: string;
  status: string;
  total_files: number;
  processed_files: number;
  created_at: string;
  completed_at: string | null;
}

export function JobHistory() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("watermark_jobs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (data) {
      setJobs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "processing":
        return <Loader2 className="h-4 w-4 text-warning animate-spin" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10";
      case "processing":
        return "bg-warning/10";
      case "failed":
        return "bg-destructive/10";
      default:
        return "bg-muted";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Recent Jobs</h3>
        <Button variant="ghost" size="icon" onClick={fetchJobs}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No watermarking jobs yet
        </p>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(job.status)}`}>
                  {getStatusIcon(job.status)}
                </div>
                <div>
                  <p className="font-medium text-sm">{job.job_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {job.processed_files}/{job.total_files} files
                  </p>
                  {job.status === "processing" && (
                    <Progress
                      value={(job.processed_files / job.total_files) * 100}
                      className="h-1 w-24 mt-1"
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
                {job.status === "completed" && (
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
