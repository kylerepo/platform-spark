import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Fingerprint,
  Shield,
  ArrowRight,
  Settings,
  Calendar,
  Zap
} from "lucide-react";
import { FileUploader } from "@/components/watermark/FileUploader";
import { WatermarkConfig, type WatermarkSettings } from "@/components/watermark/WatermarkConfig";
import { TemplateSaver } from "@/components/watermark/TemplateSaver";
import { JobHistory } from "@/components/watermark/JobHistory";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UploadedFile {
  id: string;
  file: File;
  storagePath?: string;
  status: string;
}

interface Template {
  id: string;
  name: string;
  created_at: string;
}

const defaultSettings: WatermarkSettings = {
  watermarkType: "invisible_qr",
  strength: 70,
  position: "center",
  audioWatermark: true,
  addTimestamp: true,
  temporalSpreading: false,
  frameInterval: 10,
  creatorId: "",
  customMetadata: "",
  pdfProtection: false,
  compressionResilience: "medium",
  platformPreset: "custom"
};

export default function WatermarkToolPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<WatermarkSettings>(defaultSettings);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [jobName, setJobName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [credits, setCredits] = useState(83);

  const fetchTemplates = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("watermark_templates")
      .select("id, name, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    
    if (data) setTemplates(data);
  };

  useEffect(() => {
    fetchTemplates();
  }, [user]);

  const completedFiles = uploadedFiles.filter(f => f.status === "completed" && f.storagePath);

  const startProcessing = async () => {
    if (!user || completedFiles.length === 0) {
      toast.error("Please upload files first");
      return;
    }

    if (!jobName.trim()) {
      toast.error("Please enter a job name");
      return;
    }

    setIsProcessing(true);

    // Create watermark job with properly typed settings
    const jobSettings = {
      watermarkType: settings.watermarkType,
      strength: settings.strength,
      position: settings.position,
      audioWatermark: settings.audioWatermark,
      addTimestamp: settings.addTimestamp,
      temporalSpreading: settings.temporalSpreading,
      frameInterval: settings.frameInterval,
      creatorId: settings.creatorId,
      customMetadata: settings.customMetadata,
      pdfProtection: settings.pdfProtection,
      compressionResilience: settings.compressionResilience,
      platformPreset: settings.platformPreset
    };

    try {
      const { data: job, error: jobError } = await supabase
        .from("watermark_jobs")
        .insert([{
          user_id: user.id,
          job_name: jobName,
          status: "pending" as const,
          total_files: completedFiles.length,
          processed_files: 0,
          settings: jobSettings
        }])
        .select()
        .single();

      if (jobError || !job) {
        toast.error("Failed to create job");
        setIsProcessing(false);
        return;
      }

      // Create file records
      const fileRecords = completedFiles.map(f => ({
        job_id: job.id,
        user_id: user.id,
        original_file_path: f.storagePath!,
        file_name: f.file.name,
        file_type: f.file.type,
        file_size: f.file.size,
        status: "pending" as const
      }));

      const { data: insertedFiles, error: filesError } = await supabase
        .from("watermark_files")
        .insert(fileRecords)
        .select();

      if (filesError || !insertedFiles) {
        toast.error("Failed to register files");
        setIsProcessing(false);
        return;
      }

      // Call the edge function to process watermarks
      const { data, error } = await supabase.functions.invoke("process-watermark", {
        body: {
          jobId: job.id,
          fileIds: insertedFiles.map(f => f.id),
          settings: jobSettings
        }
      });

      if (error) {
        console.error("Watermark processing error:", error);
        toast.error("Failed to process watermarks");
        setIsProcessing(false);
        return;
      }

      setIsProcessing(false);
      setUploadedFiles([]);
      setJobName("");
      setCredits(prev => Math.max(0, prev - completedFiles.length));
      
      if (data?.errors?.length > 0) {
        toast.warning(`Processed ${data.processedCount}/${data.totalFiles} files with some errors`);
      } else {
        toast.success(`Successfully watermarked ${data.processedCount} files with AI-powered encoding!`);
      }
    } catch (error) {
      console.error("Processing error:", error);
      toast.error("An error occurred during processing");
      setIsProcessing(false);
    }
  };

  const scheduleJob = async () => {
    if (!scheduledTime) {
      toast.error("Please select a time");
      return;
    }

    toast.success(`Job scheduled for ${new Date(scheduledTime).toLocaleString()}`);
    setScheduleDialog(false);
    setScheduledTime("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Watermark Tool</h1>
        <p className="text-muted-foreground">
          Add invisible forensic watermarks to protect your content
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Tool */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Upload */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Select Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader
                onFilesSelected={setUploadedFiles}
                maxFiles={1000}
              />
            </CardContent>
          </Card>

          {/* Step 2: Configure */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Configure Watermark
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WatermarkConfig settings={settings} onChange={setSettings} />
            </CardContent>
          </Card>

          {/* Step 3: Process */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Process & Download
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Job Name</Label>
                <Input
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  placeholder="e.g., March_Collection_2024"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{completedFiles.length} files ready</p>
                    <p className="text-sm text-muted-foreground">
                      {completedFiles.length === 0 ? "Upload files to begin" : "Ready to process"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setScheduleDialog(true)}
                    disabled={completedFiles.length === 0}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <Button
                    variant="hero"
                    onClick={startProcessing}
                    disabled={completedFiles.length === 0 || isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Process Now
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Processing preserves original quality and maintains metadata
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Credits */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Credits Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold gradient-text">{credits}</p>
                <p className="text-sm text-muted-foreground">of 300 remaining</p>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(credits / 300) * 100}%` }}
                />
              </div>
              <Button variant="outline" className="w-full">
                Get More Credits
              </Button>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <TemplateSaver
                settings={settings}
                templates={templates}
                onTemplateLoad={setSettings}
                onTemplatesChange={fetchTemplates}
              />
            </CardContent>
          </Card>

          {/* Job History */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <JobHistory />
            </CardContent>
          </Card>

          {/* Pro Tip */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <Settings className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold mb-2">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Use batch processing to watermark up to 1000 files at once.
                Enable audio watermarking for videos to track even if the video
                is re-encoded. Save templates for quick reuse!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialog} onOpenChange={setScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Processing</DialogTitle>
            <DialogDescription>
              Set a time for automatic processing of your files.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Scheduled Time</Label>
              <Input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={scheduleJob}>Schedule Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
