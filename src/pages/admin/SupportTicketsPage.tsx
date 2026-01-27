import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Send
} from "lucide-react";
import { toast } from "sonner";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  user_email: string;
  user_name: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  created_at: string;
  updated_at: string;
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "admin";
  created_at: string;
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Unable to download watermarked files",
    description: "I processed 50 files yesterday but can't download them now. The download button doesn't work.",
    user_email: "sarah@example.com",
    user_name: "Sarah Chen",
    status: "open",
    priority: "high",
    created_at: "2024-02-15T10:30:00Z",
    updated_at: "2024-02-15T10:30:00Z",
    messages: [
      {
        id: "m1",
        content: "I processed 50 files yesterday but can't download them now. The download button doesn't work.",
        sender: "user",
        created_at: "2024-02-15T10:30:00Z"
      }
    ]
  },
  {
    id: "2",
    subject: "Billing question about Pro plan",
    description: "I was charged twice for my Pro subscription. Can you help?",
    user_email: "mike@example.com",
    user_name: "Mike Johnson",
    status: "in_progress",
    priority: "medium",
    created_at: "2024-02-14T14:20:00Z",
    updated_at: "2024-02-15T09:00:00Z",
    messages: [
      {
        id: "m2",
        content: "I was charged twice for my Pro subscription. Can you help?",
        sender: "user",
        created_at: "2024-02-14T14:20:00Z"
      },
      {
        id: "m3",
        content: "Hi Mike, I'm looking into this for you. Can you provide the last 4 digits of your card?",
        sender: "admin",
        created_at: "2024-02-15T09:00:00Z"
      }
    ]
  },
  {
    id: "3",
    subject: "Feature request: batch scheduling",
    description: "Would love to be able to schedule batch watermarking jobs for off-peak hours.",
    user_email: "emma@example.com",
    user_name: "Emma Williams",
    status: "resolved",
    priority: "low",
    created_at: "2024-02-10T08:00:00Z",
    updated_at: "2024-02-12T16:00:00Z",
    messages: []
  },
];

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openTicketDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setTicketDialogOpen(true);
  };

  const sendReply = () => {
    if (!selectedTicket || !replyText.trim()) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      content: replyText,
      sender: "admin",
      created_at: new Date().toISOString()
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, messages: [...t.messages, newMessage], updated_at: new Date().toISOString() }
          : t
      )
    );

    setSelectedTicket((prev) =>
      prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
    );

    setReplyText("");
    toast.success("Reply sent");
  };

  const updateTicketStatus = () => {
    if (!selectedTicket) return;

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, status: newStatus as Ticket["status"] }
          : t
      )
    );

    setSelectedTicket((prev) =>
      prev ? { ...prev, status: newStatus as Ticket["status"] } : null
    );

    toast.success("Status updated");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-primary/20 text-primary border-primary/30">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-success/20 text-success border-success/30">Resolved</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Urgent</Badge>;
      case "high":
        return <Badge className="bg-warning/20 text-warning border-warning/30">High</Badge>;
      case "medium":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const stats = {
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    total: tickets.length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <p className="text-muted-foreground">Manage customer support requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.open}</p>
                <p className="text-sm text-muted-foreground">Open</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.resolved}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{ticket.subject}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {ticket.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{ticket.user_name}</p>
                      <p className="text-sm text-muted-foreground">{ticket.user_email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openTicketDetails(ticket)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ticket Details Dialog */}
      <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTicket?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedTicket?.user_name} ({selectedTicket?.user_email})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Status Update */}
            <div className="flex items-center gap-4">
              <Label>Status:</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={updateTicketStatus}>
                Update
              </Button>
            </div>

            {/* Messages */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {selectedTicket?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.sender === "admin"
                      ? "bg-primary/10 ml-8"
                      : "bg-secondary mr-8"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {msg.sender === "admin" ? "Support Team" : selectedTicket.user_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))}
            </div>

            {/* Reply */}
            <div className="space-y-2">
              <Label>Reply</Label>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTicketDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={sendReply} disabled={!replyText.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
