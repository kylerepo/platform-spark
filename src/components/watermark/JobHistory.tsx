import { useState, useEffect } from "react";
import { Download, Clock, CheckCircle2, AlertCircle, Loader2, RefreshCw, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Job {
  id: string;
  job_name: string;
  status: string;
  total_files: number;
  processed_files: number;
  created_at: string;
  completed_at: string | null;
}

interface WatermarkFile {
  id: string;
  file_name: string;
  watermarked_file_path: string | null;
  status: string;
}

export function JobHistory() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobFiles, setJobFiles] = useState<WatermarkFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

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

  // Subscribe to realtime updates for job progress
  useEffect(() => {
    if (!user) return;

    fetchJobs();

    // Subscribe to realtime changes on watermark_jobs
    const channel = supabase
      .channel("watermark-jobs-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "watermark_jobs",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Job update received:", payload);
          
          if (payload.eventType === "INSERT") {
            setJobs((prev) => [payload.new as Job, ...prev].slice(0, 10));
          } else if (payload.eventType === "UPDATE") {
            setJobs((prev) =>
              prev.map((job) =>
                job.id === (payload.new as Job).id ? (payload.new as Job) : job
              )
            );
          } else if (payload.eventType === "DELETE") {
            setJobs((prev) =>
              prev.filter((job) => job.id !== (payload.old as { id: string }).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

  const openDownloadDialog = async (job: Job) => {
    setSelectedJob(job);
    setDownloadDialogOpen(true);
    setLoadingFiles(true);

    const { data } = await supabase
      .from("watermark_files")
      .select("id, file_name, watermarked_file_path, status")
      .eq("job_id", job.id)
      .eq("status", "completed");

    setJobFiles(data || []);
    setLoadingFiles(false);
  };

  const downloadFile = async (file: WatermarkFile) => {
    if (!file.watermarked_file_path) {
      toast.error("File path not found");
      return;
    }

    setDownloadingFile(file.id);

    try {
      const { data, error } = await supabase.storage
        .from("watermark-processed")
        .download(file.watermarked_file_path);

      if (error) {
        console.error("Download error:", error);
        toast.error("Failed to download file");
        return;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `watermarked_${file.file_name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Downloaded ${file.file_name}`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file");
    } finally {
      setDownloadingFile(null);
    }
  };

  const downloadAllFiles = async () => {
    if (jobFiles.length === 0) return;

    for (const file of jobFiles) {
      await downloadFile(file);
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openDownloadDialog(job)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={downloadDialogOpen} onOpenChange={setDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Watermarked Files</DialogTitle>
            <DialogDescription>
              {selectedJob?.job_name} - {selectedJob?.processed_files} files ready
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {loadingFiles ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : jobFiles.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No completed files found
              </p>
            ) : (
              <>
                <Button
                  onClick={downloadAllFiles}
                  className="w-full"
                  disabled={downloadingFile !== null}
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Download All ({jobFiles.length} files)
                </Button>

                <div className="max-h-64 overflow-y-auto space-y-2">
                  {jobFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
                    >
                      <span className="text-sm truncate flex-1 mr-2">
                        {file.file_name}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => downloadFile(file)}
                        disabled={downloadingFile === file.id}
                      >
                        {downloadingFile === file.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
