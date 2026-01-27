import { useState } from "react";
import { Save, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { WatermarkSettings } from "./WatermarkConfig";

interface Template {
  id: string;
  name: string;
  created_at: string;
}

interface TemplateSaverProps {
  settings: WatermarkSettings;
  templates: Template[];
  onTemplateLoad: (settings: WatermarkSettings) => void;
  onTemplatesChange: () => void;
}

export function TemplateSaver({ 
  settings, 
  templates, 
  onTemplateLoad,
  onTemplatesChange 
}: TemplateSaverProps) {
  const { user } = useAuth();
  const [templateName, setTemplateName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const saveTemplate = async () => {
    if (!user || !templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    setIsSaving(true);
    const { error } = await supabase.from("watermark_templates").insert({
      user_id: user.id,
      name: templateName,
      watermark_type: settings.watermarkType,
      strength: settings.strength,
      position: settings.position,
      audio_watermark: settings.audioWatermark,
      add_timestamp: settings.addTimestamp,
      custom_payload: {
        creatorId: settings.creatorId,
        customMetadata: settings.customMetadata,
        temporalSpreading: settings.temporalSpreading,
        frameInterval: settings.frameInterval,
        pdfProtection: settings.pdfProtection,
        compressionResilience: settings.compressionResilience,
        platformPreset: settings.platformPreset
      }
    });

    setIsSaving(false);

    if (error) {
      toast.error("Failed to save template");
      return;
    }

    toast.success("Template saved successfully!");
    setTemplateName("");
    setDialogOpen(false);
    onTemplatesChange();
  };

  const loadTemplate = async (templateId: string) => {
    const { data, error } = await supabase
      .from("watermark_templates")
      .select("*")
      .eq("id", templateId)
      .single();

    if (error || !data) {
      toast.error("Failed to load template");
      return;
    }

    const payload = data.custom_payload as Record<string, unknown> || {};
    
    onTemplateLoad({
      watermarkType: data.watermark_type as WatermarkSettings["watermarkType"],
      strength: data.strength || 70,
      position: data.position || "center",
      audioWatermark: data.audio_watermark ?? true,
      addTimestamp: data.add_timestamp ?? true,
      creatorId: (payload.creatorId as string) || "",
      customMetadata: (payload.customMetadata as string) || "",
      temporalSpreading: (payload.temporalSpreading as boolean) || false,
      frameInterval: (payload.frameInterval as number) || 10,
      pdfProtection: (payload.pdfProtection as boolean) || false,
      compressionResilience: (payload.compressionResilience as WatermarkSettings["compressionResilience"]) || "medium",
      platformPreset: (payload.platformPreset as WatermarkSettings["platformPreset"]) || "custom"
    });

    toast.success("Template loaded!");
  };

  const deleteTemplate = async (templateId: string) => {
    const { error } = await supabase
      .from("watermark_templates")
      .delete()
      .eq("id", templateId);

    if (error) {
      toast.error("Failed to delete template");
      return;
    }

    toast.success("Template deleted");
    onTemplatesChange();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Saved Templates</Label>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              Save Current
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Template</DialogTitle>
              <DialogDescription>
                Save your current watermark settings as a reusable template.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Template Name</Label>
                <Input
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="My Template"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveTemplate} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Template"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {templates.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No saved templates yet
        </p>
      ) : (
        <div className="space-y-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div>
                <p className="font-medium text-sm">{template.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(template.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => loadTemplate(template.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => deleteTemplate(template.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
