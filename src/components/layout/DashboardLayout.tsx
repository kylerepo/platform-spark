import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  Shield, 
  LayoutDashboard, 
  FolderOpen, 
  Fingerprint, 
  Radar, 
  FileWarning, 
  BarChart3, 
  Settings, 
  CreditCard, 
  HelpCircle,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/content", icon: FolderOpen, label: "Content Library" },
  { href: "/dashboard/watermark", icon: Fingerprint, label: "Watermark Tool" },
  { href: "/dashboard/scanner", icon: Radar, label: "AI Scanner" },
  { href: "/dashboard/takedowns", icon: FileWarning, label: "Takedown Cases" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
];

const bottomLinks = [
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/help", icon: HelpCircle, label: "Help & Support" },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold text-sidebar-foreground">
            Creator<span className="text-primary">Shield</span>
          </span>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-lg bg-sidebar-accent">
            <p className="text-muted-foreground">Protected</p>
            <p className="text-lg font-bold text-sidebar-foreground">342</p>
          </div>
          <div className="p-3 rounded-lg bg-sidebar-accent">
            <p className="text-muted-foreground">Active Cases</p>
            <p className="text-lg font-bold text-primary">12</p>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-primary/15 to-transparent border-l-2 border-primary text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {bottomLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-primary/15 to-transparent border-l-2 border-primary text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Upgrade Banner */}
      <div className="p-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20">
          <p className="font-semibold text-sm mb-1">Pro Plan</p>
          <p className="text-xs text-muted-foreground mb-3">217/300 credits used</p>
          <div className="w-full h-1.5 bg-sidebar-accent rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-primary rounded-full" />
          </div>
          <Button variant="hero" size="sm" className="w-full mt-3">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border fixed inset-y-0 left-0">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          {/* Mobile Menu */}
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-sidebar">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border w-80">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search content, cases..."
                className="bg-transparent text-sm focus:outline-none flex-1"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/20 text-primary">SC</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium">Sarah Chen</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
