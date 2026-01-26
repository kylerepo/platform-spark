import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FolderOpen,
  Grid3X3,
  List,
  Search,
  Filter,
  Upload,
  Image,
  Video,
  FileAudio,
  Shield,
  MoreVertical,
  Download,
  Trash2,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const contentItems = [
  { id: 1, name: "Summer_Collection_001.jpg", type: "image", size: "2.4 MB", date: "Feb 15, 2024", protected: true },
  { id: 2, name: "BTS_Video_March.mp4", type: "video", size: "156 MB", date: "Feb 14, 2024", protected: true },
  { id: 3, name: "Exclusive_Set_002.jpg", type: "image", size: "3.1 MB", date: "Feb 14, 2024", protected: true },
  { id: 4, name: "Audio_Message_01.mp3", type: "audio", size: "4.2 MB", date: "Feb 13, 2024", protected: false },
  { id: 5, name: "Premium_Content_003.jpg", type: "image", size: "2.8 MB", date: "Feb 13, 2024", protected: true },
  { id: 6, name: "Live_Stream_Clip.mp4", type: "video", size: "89 MB", date: "Feb 12, 2024", protected: true },
  { id: 7, name: "Photoset_Spring.zip", type: "archive", size: "45 MB", date: "Feb 11, 2024", protected: true },
  { id: 8, name: "Exclusive_Set_004.jpg", type: "image", size: "2.2 MB", date: "Feb 10, 2024", protected: false },
];

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "image":
      return <Image className="h-5 w-5 text-primary" />;
    case "video":
      return <Video className="h-5 w-5 text-accent" />;
    case "audio":
      return <FileAudio className="h-5 w-5 text-warning" />;
    default:
      return <FolderOpen className="h-5 w-5 text-muted-foreground" />;
  }
};

export default function ContentLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContent = contentItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Library</h1>
          <p className="text-muted-foreground">Manage and protect your uploaded content</p>
        </div>
        <Button variant="hero">
          <Upload className="h-4 w-4" />
          Upload Content
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">342</p>
              <p className="text-xs text-muted-foreground">Total Files</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">318</p>
              <p className="text-xs text-muted-foreground">Protected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Image className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">267</p>
              <p className="text-xs text-muted-foreground">Images</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Video className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">75</p>
              <p className="text-xs text-muted-foreground">Videos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  className="pl-10 bg-secondary border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredContent.map((item) => (
            <Card key={item.id} className="bg-card border-border hover:border-primary/50 transition-all group">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                  <TypeIcon type={item.type} />
                  {item.protected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                      <Shield className="h-3 w-3 text-success" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                    <Button size="icon" variant="secondary">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.size} • {item.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Size</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredContent.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <TypeIcon type={item.type} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4 capitalize text-muted-foreground">{item.type}</td>
                    <td className="p-4 text-muted-foreground">{item.size}</td>
                    <td className="p-4 text-muted-foreground">{item.date}</td>
                    <td className="p-4">
                      {item.protected ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full badge-success text-xs">
                          <Shield className="h-3 w-3" />
                          Protected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
                          Unprotected
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="h-4 w-4 mr-2" />
                            Watermark
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
