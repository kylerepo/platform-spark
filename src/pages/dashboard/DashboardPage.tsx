import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  FolderOpen,
  Radar,
  FileWarning,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Zap,
  Eye,
  BarChart3
} from "lucide-react";

const quickActions = [
  { icon: Plus, label: "Add New Content", href: "/dashboard/watermark", color: "primary" },
  { icon: Radar, label: "Run Quick Scan", href: "/dashboard/scanner", color: "accent" },
  { icon: FileWarning, label: "View Recent Cases", href: "/dashboard/takedowns", color: "warning" },
  { icon: BarChart3, label: "Generate Report", href: "/dashboard/analytics", color: "success" },
];

const stats = [
  {
    title: "Protected Files",
    value: "342",
    change: "+12 this week",
    trend: "up",
    icon: Shield,
  },
  {
    title: "Infringements Found",
    value: "47",
    change: "5 new today",
    trend: "down",
    icon: Eye,
  },
  {
    title: "Active Cases",
    value: "12",
    change: "3 pending response",
    trend: "neutral",
    icon: FileWarning,
  },
  {
    title: "Success Rate",
    value: "94%",
    change: "+2% this month",
    trend: "up",
    icon: CheckCircle2,
  },
];

const recentActivity = [
  {
    type: "watermark",
    message: "Watermarked 15 new images",
    time: "2 hours ago",
    icon: Shield,
  },
  {
    type: "detection",
    message: "Found 3 infringements on Reddit",
    time: "4 hours ago",
    icon: AlertTriangle,
  },
  {
    type: "takedown",
    message: "Takedown submitted to Google",
    time: "Yesterday",
    icon: FileWarning,
  },
  {
    type: "success",
    message: "Content removed from TubeX",
    time: "Yesterday",
    icon: CheckCircle2,
  },
  {
    type: "scan",
    message: "Weekly scan completed",
    time: "2 days ago",
    icon: Radar,
  },
];

const pendingTasks = [
  { task: "Review 2 potential matches (medium confidence)", priority: "medium" },
  { task: "Follow up on case #4587 (awaiting response)", priority: "high" },
  { task: "Renew subscription in 14 days", priority: "low" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">
            <span className="text-primary font-medium">Pro Plan</span> • Next billing: Mar 15, 2024
          </p>
        </div>
        <Button variant="hero">
          <Plus className="h-4 w-4" />
          Add Content
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.label} to={action.href}>
            <Card className="bg-card border-border hover:border-primary/50 hover:shadow-glow-sm transition-all cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-sm">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                {stat.trend === "up" && <TrendingUp className="h-5 w-5 text-success" />}
                {stat.trend === "down" && <TrendingDown className="h-5 w-5 text-destructive" />}
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === "success" ? "bg-success/10" :
                    activity.type === "detection" ? "bg-destructive/10" :
                    "bg-primary/10"
                  }`}>
                    <activity.icon className={`h-5 w-5 ${
                      activity.type === "success" ? "text-success" :
                      activity.type === "detection" ? "text-destructive" :
                      "text-primary"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Protection Score */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Protection Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="12"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${92 * 3.51} ${100 * 3.51}`}
                      className="drop-shadow-[0_0_8px_hsl(var(--primary))]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">92%</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Your content is well protected. Consider upgrading for unlimited scans.
              </p>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    task.priority === "high" ? "bg-destructive" :
                    task.priority === "medium" ? "bg-warning" :
                    "bg-muted-foreground"
                  }`} />
                  <p className="text-sm">{task.task}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Revenue Protected */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Estimated Revenue Protected</p>
              <p className="text-3xl font-bold gradient-text">$2,450</p>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
