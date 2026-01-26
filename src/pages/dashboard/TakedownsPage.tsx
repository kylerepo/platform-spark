import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileWarning,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Eye,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const cases = [
  {
    id: "#4587",
    platform: "Reddit",
    contentType: "Image Set",
    submitted: "Feb 15, 2024",
    status: "resolved",
    responseTime: "2 hours",
  },
  {
    id: "#4588",
    platform: "Twitter",
    contentType: "Video",
    submitted: "Feb 14, 2024",
    status: "pending",
    responseTime: "-",
  },
  {
    id: "#4589",
    platform: "TubeX",
    contentType: "Images",
    submitted: "Feb 13, 2024",
    status: "in_review",
    responseTime: "-",
  },
  {
    id: "#4590",
    platform: "FileHost",
    contentType: "Archive",
    submitted: "Feb 12, 2024",
    status: "resolved",
    responseTime: "24 hours",
  },
  {
    id: "#4591",
    platform: "Forum",
    contentType: "Images",
    submitted: "Feb 11, 2024",
    status: "appealed",
    responseTime: "-",
  },
];

const stats = [
  { label: "Total Cases", value: "156", icon: FileWarning },
  { label: "Resolved", value: "142", icon: CheckCircle2, color: "success" },
  { label: "Pending", value: "8", icon: Clock, color: "warning" },
  { label: "Success Rate", value: "91%", icon: AlertTriangle, color: "primary" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "resolved":
      return <Badge className="badge-success">Resolved</Badge>;
    case "pending":
      return <Badge className="badge-warning">Pending</Badge>;
    case "in_review":
      return <Badge className="badge-primary">In Review</Badge>;
    case "appealed":
      return <Badge className="badge-destructive">Appealed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function TakedownsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Takedown Cases</h1>
          <p className="text-muted-foreground">Manage and track your DMCA takedown requests</p>
        </div>
        <Button variant="hero">
          <Plus className="h-4 w-4" />
          New Takedown
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                stat.color ? `bg-${stat.color}/10` : "bg-primary/10"
              }`}>
                <stat.icon className={`h-5 w-5 ${
                  stat.color ? `text-${stat.color}` : "text-primary"
                }`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="appealed">Appealed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="reddit">Reddit</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="tube">Tube Sites</SelectItem>
                <SelectItem value="forums">Forums</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="7">
              <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Case #</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Platform</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Content Type</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Submitted</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Response</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <tr key={caseItem.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="p-4">
                      <span className="font-medium">{caseItem.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        {caseItem.platform}
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{caseItem.contentType}</td>
                    <td className="p-4 text-muted-foreground">{caseItem.submitted}</td>
                    <td className="p-4">{getStatusBadge(caseItem.status)}</td>
                    <td className="p-4 text-muted-foreground">{caseItem.responseTime}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Quick Takedown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Submit a new takedown request using our pre-filled templates. 
              Auto-populates evidence from your scan results.
            </p>
            <Button variant="outline" className="w-full">
              Start Takedown Wizard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Need Legal Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              For complex cases or counter-notices, our legal consultation 
              network is here to help.
            </p>
            <Button variant="hero" className="w-full">
              Book Consultation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
