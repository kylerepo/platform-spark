import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Fingerprint,
  Upload,
  Cloud,
  Settings,
  Download,
  Shield,
  Clock,
  CheckCircle2,
  Image,
  ArrowRight
} from "lucide-react";

const recentJobs = [
  { id: 1, name: "Summer_Collection_batch", files: 45, status: "completed", date: "Feb 15, 2024" },
  { id: 2, name: "New_Video_Set", files: 12, status: "completed", date: "Feb 14, 2024" },
  { id: 3, name: "March_Exclusives", files: 28, status: "processing", date: "Feb 15, 2024" },
];

export default function WatermarkToolPage() {
  const [strength, setStrength] = useState([70]);
  const [position, setPosition] = useState("center");
  const [audioWatermark, setAudioWatermark] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Watermark Tool</h1>
        <p className="text-muted-foreground">Add invisible forensic watermarks to protect your content</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Tool */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Upload */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                Select Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium mb-2">Drag & drop files here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                <Button variant="outline">
                  Browse Files
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                <Button variant="ghost" className="gap-2">
                  <Cloud className="h-4 w-4" />
                  Import from Cloud
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Configure */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                Configure Watermark
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Watermark Type */}
              <div className="space-y-3">
                <Label>Watermark Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border-2 border-primary bg-primary/5 cursor-pointer">
                    <Fingerprint className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">Invisible QR</p>
                    <p className="text-xs text-muted-foreground">Recommended</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors">
                    <Image className="h-6 w-6 text-muted-foreground mb-2" />
                    <p className="font-medium">Data Matrix</p>
                    <p className="text-xs text-muted-foreground">Alternative</p>
                  </div>
                </div>
              </div>

              {/* Strength */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Strength</Label>
                  <span className="text-sm text-muted-foreground">{strength[0]}%</span>
                </div>
                <Slider
                  value={strength}
                  onValueChange={setStrength}
                  min={30}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher strength = better detection, but may affect image quality slightly
                </p>
              </div>

              {/* Position */}
              <div className="space-y-3">
                <Label>Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center (Recommended)</SelectItem>
                    <SelectItem value="distributed">Distributed</SelectItem>
                    <SelectItem value="custom">Custom Grid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audio Watermark (for videos)</Label>
                    <p className="text-xs text-muted-foreground">Embed audio fingerprint</p>
                  </div>
                  <Switch checked={audioWatermark} onCheckedChange={setAudioWatermark} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Add Timestamp</Label>
                    <p className="text-xs text-muted-foreground">Include date in metadata</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Process */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                Process & Download
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">0 files selected</p>
                    <p className="text-sm text-muted-foreground">Select files to begin</p>
                  </div>
                </div>
                <Button variant="hero" disabled>
                  Start Processing
                  <ArrowRight className="h-4 w-4" />
                </Button>
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
                <p className="text-4xl font-bold gradient-text">83</p>
                <p className="text-sm text-muted-foreground">of 300 remaining</p>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <div className="w-1/4 h-full bg-primary rounded-full" />
              </div>
              <Button variant="outline" className="w-full">
                Get More Credits
              </Button>
            </CardContent>
          </Card>

          {/* Recent Jobs */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Recent Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      job.status === "completed" ? "bg-success/10" : "bg-warning/10"
                    }`}>
                      {job.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <Clock className="h-4 w-4 text-warning" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{job.name}</p>
                      <p className="text-xs text-muted-foreground">{job.files} files</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <Settings className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold mb-2">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Use batch processing to watermark up to 100 files at once. 
                Enable audio watermarking for videos to track even if the video is re-encoded.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
