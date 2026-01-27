import { useState } from "react";
import { 
  Fingerprint, 
  Image, 
  QrCode, 
  Grid3X3,
  Music,
  FileText,
  Layers
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface WatermarkSettings {
  watermarkType: "invisible_qr" | "data_matrix" | "multi_layer";
  strength: number;
  position: string;
  customX?: number;
  customY?: number;
  audioWatermark: boolean;
  addTimestamp: boolean;
  temporalSpreading: boolean;
  frameInterval: number;
  creatorId: string;
  customMetadata: string;
  pdfProtection: boolean;
  compressionResilience: "low" | "medium" | "high";
  platformPreset: "onlyfans" | "fansly" | "patreon" | "custom";
}

interface WatermarkConfigProps {
  settings: WatermarkSettings;
  onChange: (settings: WatermarkSettings) => void;
}

const positionGrid = [
  { id: "top-left", label: "Top Left" },
  { id: "top-center", label: "Top Center" },
  { id: "top-right", label: "Top Right" },
  { id: "center-left", label: "Center Left" },
  { id: "center", label: "Center" },
  { id: "center-right", label: "Center Right" },
  { id: "bottom-left", label: "Bottom Left" },
  { id: "bottom-center", label: "Bottom Center" },
  { id: "bottom-right", label: "Bottom Right" },
];

export function WatermarkConfig({ settings, onChange }: WatermarkConfigProps) {
  const updateSetting = <K extends keyof WatermarkSettings>(
    key: K,
    value: WatermarkSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Watermark Type */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Watermark Type</Label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => updateSetting("watermarkType", "invisible_qr")}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              settings.watermarkType === "invisible_qr"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <QrCode className={`h-6 w-6 mb-2 ${settings.watermarkType === "invisible_qr" ? "text-primary" : "text-muted-foreground"}`} />
            <p className="font-medium text-sm">Invisible QR</p>
            <p className="text-xs text-muted-foreground">Recommended</p>
          </button>
          <button
            onClick={() => updateSetting("watermarkType", "data_matrix")}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              settings.watermarkType === "data_matrix"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Grid3X3 className={`h-6 w-6 mb-2 ${settings.watermarkType === "data_matrix" ? "text-primary" : "text-muted-foreground"}`} />
            <p className="font-medium text-sm">Data Matrix</p>
            <p className="text-xs text-muted-foreground">Alternative</p>
          </button>
          <button
            onClick={() => updateSetting("watermarkType", "multi_layer")}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              settings.watermarkType === "multi_layer"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Layers className={`h-6 w-6 mb-2 ${settings.watermarkType === "multi_layer" ? "text-primary" : "text-muted-foreground"}`} />
            <p className="font-medium text-sm">Multi-Layer</p>
            <p className="text-xs text-muted-foreground">Max Protection</p>
          </button>
        </div>
      </div>

      {/* Platform Preset */}
      <div className="space-y-3">
        <Label>Platform Preset</Label>
        <Select
          value={settings.platformPreset}
          onValueChange={(v) => updateSetting("platformPreset", v as WatermarkSettings["platformPreset"])}
        >
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="onlyfans">OnlyFans Optimized</SelectItem>
            <SelectItem value="fansly">Fansly Optimized</SelectItem>
            <SelectItem value="patreon">Patreon Optimized</SelectItem>
            <SelectItem value="custom">Custom Settings</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Pre-configured settings optimized for each platform's compression
        </p>
      </div>

      {/* Strength */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Watermark Strength</Label>
          <span className="text-sm font-medium text-primary">{settings.strength}%</span>
        </div>
        <Slider
          value={[settings.strength]}
          onValueChange={([v]) => updateSetting("strength", v)}
          min={30}
          max={100}
          step={5}
        />
        <p className="text-xs text-muted-foreground">
          Higher = better detection, slight quality impact. Lower = invisible, harder to detect
        </p>
      </div>

      {/* Compression Resilience */}
      <div className="space-y-3">
        <Label>Compression Resilience</Label>
        <Select
          value={settings.compressionResilience}
          onValueChange={(v) => updateSetting("compressionResilience", v as WatermarkSettings["compressionResilience"])}
        >
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low (Faster processing)</SelectItem>
            <SelectItem value="medium">Medium (Balanced)</SelectItem>
            <SelectItem value="high">High (Maximum survival)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Survives JPEG re-compression, screenshot, and re-encoding
        </p>
      </div>

      <Tabs defaultValue="position" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="position">Position</TabsTrigger>
          <TabsTrigger value="payload">Payload</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="position" className="space-y-4 mt-4">
          {/* Position Grid */}
          <div className="space-y-3">
            <Label>Watermark Position</Label>
            <div className="grid grid-cols-3 gap-2">
              {positionGrid.map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => updateSetting("position", pos.id)}
                  className={`p-3 rounded border text-xs font-medium transition-all ${
                    settings.position === pos.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {settings.position === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>X Coordinate (%)</Label>
                <Input
                  type="number"
                  value={settings.customX || 50}
                  onChange={(e) => updateSetting("customX", Number(e.target.value))}
                  min={0}
                  max={100}
                />
              </div>
              <div className="space-y-2">
                <Label>Y Coordinate (%)</Label>
                <Input
                  type="number"
                  value={settings.customY || 50}
                  onChange={(e) => updateSetting("customY", Number(e.target.value))}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="payload" className="space-y-4 mt-4">
          {/* Creator ID */}
          <div className="space-y-2">
            <Label>Creator ID</Label>
            <Input
              value={settings.creatorId}
              onChange={(e) => updateSetting("creatorId", e.target.value)}
              placeholder="Your unique creator identifier"
            />
            <p className="text-xs text-muted-foreground">
              Embedded in watermark for ownership verification
            </p>
          </div>

          {/* Custom Metadata */}
          <div className="space-y-2">
            <Label>Custom Metadata</Label>
            <Textarea
              value={settings.customMetadata}
              onChange={(e) => updateSetting("customMetadata", e.target.value)}
              placeholder="Add custom data: campaign ID, license info, etc."
              rows={3}
            />
          </div>

          {/* Timestamp */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div>
              <Label>Auto Timestamp</Label>
              <p className="text-xs text-muted-foreground">Include date/time in metadata</p>
            </div>
            <Switch
              checked={settings.addTimestamp}
              onCheckedChange={(v) => updateSetting("addTimestamp", v)}
            />
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          {/* Audio Watermark */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <Music className="h-5 w-5 text-primary" />
              <div>
                <Label>Audio Watermarking</Label>
                <p className="text-xs text-muted-foreground">Inaudible encoding for videos</p>
              </div>
            </div>
            <Switch
              checked={settings.audioWatermark}
              onCheckedChange={(v) => updateSetting("audioWatermark", v)}
            />
          </div>

          {/* Temporal Spreading */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <Fingerprint className="h-5 w-5 text-accent" />
              <div>
                <Label>Temporal Spreading (Video)</Label>
                <p className="text-xs text-muted-foreground">Distribute across frames</p>
              </div>
            </div>
            <Switch
              checked={settings.temporalSpreading}
              onCheckedChange={(v) => updateSetting("temporalSpreading", v)}
            />
          </div>

          {settings.temporalSpreading && (
            <div className="space-y-2 pl-4">
              <Label>Frame Interval</Label>
              <Select
                value={String(settings.frameInterval)}
                onValueChange={(v) => updateSetting("frameInterval", Number(v))}
              >
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Every 5 frames</SelectItem>
                  <SelectItem value="10">Every 10 frames</SelectItem>
                  <SelectItem value="30">Every 30 frames (1 sec)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* PDF Protection */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-warning" />
              <div>
                <Label>PDF/Document Protection</Label>
                <p className="text-xs text-muted-foreground">Text pattern embedding</p>
              </div>
            </div>
            <Switch
              checked={settings.pdfProtection}
              onCheckedChange={(v) => updateSetting("pdfProtection", v)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
