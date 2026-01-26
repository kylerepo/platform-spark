import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Download,
  TrendingUp,
  TrendingDown,
  Globe,
  Shield,
  DollarSign,
  Calendar
} from "lucide-react";

const platformData = [
  { name: "Reddit", value: 35, color: "primary" },
  { name: "Twitter", value: 25, color: "accent" },
  { name: "Tube Sites", value: 20, color: "warning" },
  { name: "Forums", value: 12, color: "destructive" },
  { name: "Others", value: 8, color: "muted" },
];

const monthlyStats = [
  { month: "Jan", infringements: 32, resolved: 30 },
  { month: "Feb", infringements: 45, resolved: 42 },
  { month: "Mar", infringements: 28, resolved: 28 },
  { month: "Apr", infringements: 52, resolved: 48 },
  { month: "May", infringements: 38, resolved: 36 },
  { month: "Jun", infringements: 47, resolved: 45 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Track your content protection performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30">
            <SelectTrigger className="w-40 bg-secondary border-border">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <span className="text-xs text-success">↓ 12%</span>
            </div>
            <p className="text-2xl font-bold mb-1">47</p>
            <p className="text-sm text-muted-foreground">Infringements Found</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <span className="text-xs text-success">↑ 3%</span>
            </div>
            <p className="text-2xl font-bold mb-1">94%</p>
            <p className="text-sm text-muted-foreground">Takedown Success</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">avg</span>
            </div>
            <p className="text-2xl font-bold mb-1">4.2 hrs</p>
            <p className="text-sm text-muted-foreground">Avg. Response Time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs text-success">↑ 24%</span>
            </div>
            <p className="text-2xl font-bold gradient-text mb-1">$2,450</p>
            <p className="text-sm text-muted-foreground">Revenue Protected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle>Infringement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyStats.map((stat) => (
                <div key={stat.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col gap-1">
                    <div 
                      className="w-full bg-primary/20 rounded-t"
                      style={{ height: `${stat.infringements * 3}px` }}
                    />
                    <div 
                      className="w-full bg-primary rounded-t"
                      style={{ height: `${stat.resolved * 3}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary/20" />
                <span className="text-xs text-muted-foreground">Found</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-xs text-muted-foreground">Resolved</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Top Infringing Platforms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {platformData.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{platform.name}</span>
                  <span className="text-sm text-muted-foreground">{platform.value}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${platform.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ROI Calculator */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>ROI Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-3xl font-bold gradient-text mb-1">$49</p>
              <p className="text-sm text-muted-foreground">Monthly Subscription</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-3xl font-bold text-destructive mb-1">47</p>
              <p className="text-sm text-muted-foreground">Infringements Stopped</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-3xl font-bold text-success mb-1">$2,450</p>
              <p className="text-sm text-muted-foreground">Estimated Revenue Saved</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30">
              <p className="text-3xl font-bold gradient-text mb-1">49x</p>
              <p className="text-sm text-muted-foreground">Return on Investment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Generator */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Select defaultValue="summary">
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="detailed">Detailed Report</SelectItem>
                <SelectItem value="legal">Legal Report</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30">
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="pdf">
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="hero">
              <BarChart3 className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
