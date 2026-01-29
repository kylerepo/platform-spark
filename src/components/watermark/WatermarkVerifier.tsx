import { useState, useCallback } from "react";
import { Shield, Upload, CheckCircle2, XCircle, Loader2, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VerificationResult {
  verified: boolean;
  confidence: number;
  fingerprint?: string;
  metadata?: {
    creatorId?: string;
    timestamp?: string;
    platformPreset?: string;
    watermarkType?: string;
    customMetadata?: string;
  };
  matchedFile?: {
    id: string;
    fileName: string;
    jobId: string;
    jobName: string;
    createdAt: string;
  };
}

export function WatermarkVerifier() {
  const [isDragging, setIsDragging] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const verifyFile = async (file: File) => {
    setSelectedFile(file);
    setIsVerifying(true);
    setResult(null);

    try {
      // Convert file to base64
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let binary = "";
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }
      const base64Data = btoa(binary);

      const { data, error } = await supabase.functions.invoke("verify-watermark", {
        body: {
          fileData: base64Data,
          fileName: file.name,
          fileType: file.type,
        },
      });

      if (error) {
        console.error("Verification error:", error);
        toast.error("Failed to verify watermark");
        return;
      }

      setResult(data as VerificationResult);
      
      if (data.verified) {
        toast.success(`Watermark verified with ${data.confidence}% confidence!`);
      } else {
        toast.info("No watermark detected in this file");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify watermark");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      verifyFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      verifyFile(files[0]);
    }
  };

  const resetVerifier = () => {
    setResult(null);
    setSelectedFile(null);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSearch className="h-5 w-5 text-primary" />
          Watermark Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!result && !isVerifying && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-3">
              Drop a file to verify its watermark
            </p>
            <label htmlFor="verify-file-input">
              <Button variant="outline" size="sm" asChild>
                <span>Choose File</span>
              </Button>
            </label>
            <input
              id="verify-file-input"
              type="file"
              className="hidden"
              accept="image/*,video/*,audio/*,.pdf"
              onChange={handleFileSelect}
            />
          </div>
        )}

        {isVerifying && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
            <p className="text-sm text-muted-foreground">
              Analyzing {selectedFile?.name}...
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Extracting forensic fingerprint
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {result.verified ? (
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
              )}
              <div>
                <p className="font-semibold">
                  {result.verified ? "Watermark Verified" : "No Watermark Detected"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedFile?.name}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-medium">{result.confidence}%</span>
              </div>
              <Progress value={result.confidence} className="h-2" />
            </div>

            {result.verified && result.metadata && (
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  {result.metadata.platformPreset && (
                    <Badge variant="secondary">
                      {result.metadata.platformPreset}
                    </Badge>
                  )}
                  {result.metadata.watermarkType && (
                    <Badge variant="outline">
                      {result.metadata.watermarkType.replace("_", " ")}
                    </Badge>
                  )}
                </div>

                <div className="text-sm space-y-1">
                  {result.metadata.creatorId && (
                    <p>
                      <span className="text-muted-foreground">Creator: </span>
                      {result.metadata.creatorId}
                    </p>
                  )}
                  {result.metadata.timestamp && (
                    <p>
                      <span className="text-muted-foreground">Watermarked: </span>
                      {new Date(result.metadata.timestamp).toLocaleString()}
                    </p>
                  )}
                  {result.fingerprint && (
                    <p className="font-mono text-xs break-all">
                      <span className="text-muted-foreground">Fingerprint: </span>
                      {result.fingerprint}
                    </p>
                  )}
                </div>

                {result.matchedFile && (
                  <div className="p-3 rounded-lg bg-secondary/50 text-sm">
                    <p className="font-medium mb-1">Original File</p>
                    <p className="text-muted-foreground">
                      {result.matchedFile.fileName}
                    </p>
                    <p className="text-muted-foreground">
                      Job: {result.matchedFile.jobName}
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button variant="outline" onClick={resetVerifier} className="w-full">
              Verify Another File
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
