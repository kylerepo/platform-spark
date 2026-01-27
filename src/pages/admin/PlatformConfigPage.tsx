import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Shield,
  Mail,
  CreditCard,
  Bell,
  Database,
  Zap,
  Globe,
  Lock,
  Save
} from "lucide-react";
import { toast } from "sonner";

export default function PlatformConfigPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "CreatorShield Pro",
    siteUrl: "https://creatorshield.pro",
    supportEmail: "support@creatorshield.pro",
    maintenanceMode: false,
    allowSignups: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: "24",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    requireSpecialChar: true
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
    smtpUser: "apikey",
    fromEmail: "noreply@creatorshield.pro",
    fromName: "CreatorShield"
  });

  const [billingSettings, setBillingSettings] = useState({
    currency: "USD",
    taxRate: "0",
    freeCredits: "10",
    proPrice: "29",
    businessPrice: "99"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemAlerts: true,
    weeklyReports: true,
    marketingEmails: false
  });

  const [watermarkSettings, setWatermarkSettings] = useState({
    maxBatchSize: "1000",
    defaultStrength: "70",
    enableAudioWatermark: true,
    enablePdfProtection: true,
    compressionQuality: "high"
  });

  const saveSettings = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Platform Configuration</h1>
        <p className="text-muted-foreground">Manage system settings and configurations</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="watermark" className="gap-2">
            <Zap className="h-4 w-4" />
            Watermark
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                General Settings
              </CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings((prev) => ({ ...prev, siteName: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Site URL</Label>
                  <Input
                    value={generalSettings.siteUrl}
                    onChange={(e) =>
                      setGeneralSettings((prev) => ({ ...prev, siteUrl: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) =>
                      setGeneralSettings((prev) => ({ ...prev, supportEmail: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable access for non-admins
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(v) =>
                      setGeneralSettings((prev) => ({ ...prev, maintenanceMode: v }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <Label>Allow New Signups</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable/disable new user registration
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.allowSignups}
                    onCheckedChange={(v) =>
                      setGeneralSettings((prev) => ({ ...prev, allowSignups: v }))
                    }
                  />
                </div>
              </div>

              <Button onClick={() => saveSettings("General")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Security Settings
              </CardTitle>
              <CardDescription>Authentication and access control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Session Timeout (hours)</Label>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onValueChange={(v) =>
                      setSecuritySettings((prev) => ({ ...prev, sessionTimeout: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="168">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Input
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings((prev) => ({ ...prev, maxLoginAttempts: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Password Length</Label>
                  <Input
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) =>
                      setSecuritySettings((prev) => ({ ...prev, passwordMinLength: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <Label>Require Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Enforce 2FA for all users
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorRequired}
                    onCheckedChange={(v) =>
                      setSecuritySettings((prev) => ({ ...prev, twoFactorRequired: v }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <Label>Require Special Characters</Label>
                    <p className="text-sm text-muted-foreground">
                      Passwords must include special characters
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.requireSpecialChar}
                    onCheckedChange={(v) =>
                      setSecuritySettings((prev) => ({ ...prev, requireSpecialChar: v }))
                    }
                  />
                </div>
              </div>

              <Button onClick={() => saveSettings("Security")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Configuration
              </CardTitle>
              <CardDescription>SMTP and email delivery settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SMTP Host</Label>
                  <Input
                    value={emailSettings.smtpHost}
                    onChange={(e) =>
                      setEmailSettings((prev) => ({ ...prev, smtpHost: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Port</Label>
                  <Input
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings((prev) => ({ ...prev, smtpPort: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Username</Label>
                  <Input
                    value={emailSettings.smtpUser}
                    onChange={(e) =>
                      setEmailSettings((prev) => ({ ...prev, smtpUser: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>From Email</Label>
                  <Input
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) =>
                      setEmailSettings((prev) => ({ ...prev, fromEmail: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input
                    value={emailSettings.fromName}
                    onChange={(e) =>
                      setEmailSettings((prev) => ({ ...prev, fromName: e.target.value }))
                    }
                  />
                </div>
              </div>

              <Button onClick={() => saveSettings("Email")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Billing Configuration
              </CardTitle>
              <CardDescription>Pricing and payment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={billingSettings.currency}
                    onValueChange={(v) =>
                      setBillingSettings((prev) => ({ ...prev, currency: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tax Rate (%)</Label>
                  <Input
                    type="number"
                    value={billingSettings.taxRate}
                    onChange={(e) =>
                      setBillingSettings((prev) => ({ ...prev, taxRate: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Free Credits (per new user)</Label>
                  <Input
                    type="number"
                    value={billingSettings.freeCredits}
                    onChange={(e) =>
                      setBillingSettings((prev) => ({ ...prev, freeCredits: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pro Plan Price ($)</Label>
                  <Input
                    type="number"
                    value={billingSettings.proPrice}
                    onChange={(e) =>
                      setBillingSettings((prev) => ({ ...prev, proPrice: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Plan Price ($)</Label>
                  <Input
                    type="number"
                    value={billingSettings.businessPrice}
                    onChange={(e) =>
                      setBillingSettings((prev) => ({ ...prev, businessPrice: e.target.value }))
                    }
                  />
                </div>
              </div>

              <Button onClick={() => saveSettings("Billing")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Watermark Settings */}
        <TabsContent value="watermark">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Watermark Configuration
              </CardTitle>
              <CardDescription>Default watermarking settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Batch Size</Label>
                  <Input
                    type="number"
                    value={watermarkSettings.maxBatchSize}
                    onChange={(e) =>
                      setWatermarkSettings((prev) => ({ ...prev, maxBatchSize: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Default Strength (%)</Label>
                  <Input
                    type="number"
                    value={watermarkSettings.defaultStrength}
                    onChange={(e) =>
                      setWatermarkSettings((prev) => ({ ...prev, defaultStrength: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Compression Quality</Label>
                  <Select
                    value={watermarkSettings.compressionQuality}
                    onValueChange={(v) =>
                      setWatermarkSettings((prev) => ({ ...prev, compressionQuality: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Fast)</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High (Best)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <Label>Enable Audio Watermarking</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow audio watermarks in videos
                    </p>
                  </div>
                  <Switch
                    checked={watermarkSettings.enableAudioWatermark}
                    onCheckedChange={(v) =>
                      setWatermarkSettings((prev) => ({ ...prev, enableAudioWatermark: v }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <Label>Enable PDF Protection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow PDF document watermarking
                    </p>
                  </div>
                  <Switch
                    checked={watermarkSettings.enablePdfProtection}
                    onCheckedChange={(v) =>
                      setWatermarkSettings((prev) => ({ ...prev, enablePdfProtection: v }))
                    }
                  />
                </div>
              </div>

              <Button onClick={() => saveSettings("Watermark")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
