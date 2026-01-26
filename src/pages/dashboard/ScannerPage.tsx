import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Radar,
  Play,
  Pause,
  Settings,
  Globe,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  TrendingUp,
  ExternalLink
} from "lucide-react";

const platforms = [
  { id: "twitter", name: "Twitter/X", enabled: true },
  { id: "reddit", name: "Reddit", enabled: true },
  { id: "telegram", name: "Telegram", enabled: true },
  { id: "tube", name: "Tube Sites", enabled: true },
  { id: "forums", name: "Forums", enabled: false },
  { id: "filehost", name: "File Hosts", enabled: true },
  { id: "discord", name: "Discord", enabled: false },
  { id: "torrents", name: "Torrents", enabled: false },
];

const scanResults = [
  {
    id: 1,
    platform: "Reddit",
    url: "reddit.com/r/...",
    confidence: 95,
    status: "high",
    contentName: "Summer_Collection_001.jpg",
    foundDate: "2 hours ago",
  },
  {
    id: 2,
    platform: "Twitter",
    url: "twitter.com/...",
    confidence: 87,
    status: "high",
    contentName: "Exclusive_Set_002.jpg",
    foundDate: "4 hours ago",
  },
  {
    id: 3,
    platform: "TubeX",
    url: "tubex.com/...",
    confidence: 72,
    status: "medium",
    contentName: "BTS_Video_March.mp4",
    foundDate: "Yesterday",
  },
  {
    id: 4,
    platform: "FileHost",
    url: "files.com/...",
    confidence: 58,
    status: "low",
    contentName: "Photoset_Spring.zip",
    foundDate: "2 days ago",
  },
];

const activeScans = [
  { id: 1, name: "Weekly Full Scan", progress: 67, platforms: 10, startTime: "2 hrs ago" },
  { id: 2, name: "Quick Twitter Check", progress: 100, platforms: 1, startTime: "30 min ago" },
];

export default function ScannerPage() {
  const [platformStates, setPlatformStates] = useState(
    platforms.reduce((acc, p) => ({ ...acc, [p.id]: p.enabled }), {} as Record<string, boolean>)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Scanner</h1>
          <p className="text-muted-foreground">Monitor the web for unauthorized use of your content</p>
        </div>
        <Button variant="hero">
          <Radar className="h-4 w-4" />
          Start New Scan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Radar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,450</p>
              <p className="text-xs text-muted-foreground">Scans This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">47</p>
              <p className="text-xs text-muted-foreground">Matches Found</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">89%</p>
              <p className="text-xs text-muted-foreground">Detection Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">10</p>
              <p className="text-xs text-muted-foreground">Platforms Active</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Scans */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Active Scans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeScans.map((scan) => (
                <div key={scan.id} className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        scan.progress === 100 ? "bg-success/10" : "bg-primary/10"
                      }`}>
                        {scan.progress === 100 ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <Radar className="h-4 w-4 text-primary animate-pulse" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{scan.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {scan.platforms} platforms • Started {scan.startTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{scan.progress}%</span>
                      {scan.progress < 100 && (
                        <Button variant="ghost" size="icon">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <Progress value={scan.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Matches</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {scanResults.map((result) => (
                <div key={result.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    result.status === "high" ? "bg-destructive/10" :
                    result.status === "medium" ? "bg-warning/10" :
                    "bg-muted/10"
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      result.status === "high" ? "text-destructive" :
                      result.status === "medium" ? "text-warning" :
                      "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{result.contentName}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        result.status === "high" ? "badge-destructive" :
                        result.status === "medium" ? "badge-warning" :
                        "bg-secondary text-muted-foreground"
                      }`}>
                        {result.confidence}% match
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      Found on {result.platform} • {result.foundDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Takedown
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Scan Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Select platforms to monitor:</p>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={platform.id}
                        checked={platformStates[platform.id]}
                        onCheckedChange={(checked) =>
                          setPlatformStates({ ...platformStates, [platform.id]: checked as boolean })
                        }
                      />
                      <Label htmlFor={platform.id}>{platform.name}</Label>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Save Settings
              </Button>
            </CardContent>
          </Card>

          {/* Scan Credits */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Scan Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold gradient-text">1,550</p>
                <p className="text-sm text-muted-foreground">of 3,000 remaining</p>
              </div>
              <Progress value={52} className="h-2 mb-4" />
              <p className="text-xs text-muted-foreground text-center">
                Resets on March 15, 2024
              </p>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold mb-2">Scheduled Scans</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Weekly full scan scheduled for every Sunday at 2:00 AM
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Edit Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
