import { useCallback, useState } from "react";
import { Upload, Cloud, X, FileImage, FileVideo, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  storagePath?: string;
}

interface FileUploaderProps {
  onFilesSelected: (files: UploadedFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

export function FileUploader({ 
  onFilesSelected, 
  maxFiles = 1000,
  acceptedTypes = ["image/*", "video/*", "application/pdf"]
}: FileUploaderProps) {
  const { user } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FileImage className="h-5 w-5 text-primary" />;
    if (type.startsWith("video/")) return <FileVideo className="h-5 w-5 text-accent" />;
    return <File className="h-5 w-5 text-muted-foreground" />;
  };

  const uploadFile = async (file: File, fileId: string) => {
    if (!user) {
      toast.error("Please log in to upload files");
      return null;
    }

    const filePath = `${user.id}/${Date.now()}-${file.name}`;
    
    // Update progress to show uploading started
    setUploadedFiles(prev => 
      prev.map(f => f.id === fileId ? { ...f, progress: 50 } : f)
    );
    
    const { data, error } = await supabase.storage
      .from("watermark-originals")
      .upload(filePath, file);

    if (error) {
      toast.error(`Failed to upload ${file.name}`);
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, status: "error" } : f)
      );
      return null;
    }

    setUploadedFiles(prev => 
      prev.map(f => f.id === fileId ? { ...f, status: "completed", storagePath: data.path } : f)
    );

    return data.path;
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files).slice(0, maxFiles - uploadedFiles.length);
    
    const newFiles: UploadedFile[] = fileArray.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      progress: 0,
      status: "pending" as const
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Upload files
    for (const uploadedFile of newFiles) {
      setUploadedFiles(prev => 
        prev.map(f => f.id === uploadedFile.id ? { ...f, status: "uploading" } : f)
      );
      await uploadFile(uploadedFile.file, uploadedFile.id);
    }

    const updatedFiles = [...uploadedFiles, ...newFiles];
    onFilesSelected(updatedFiles);
  }, [uploadedFiles, maxFiles, onFilesSelected, user]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    const file = uploadedFiles.find(f => f.id === id);
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    const updated = uploadedFiles.filter(f => f.id !== id);
    setUploadedFiles(updated);
    onFilesSelected(updated);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Upload className="h-7 w-7 text-primary" />
        </div>
        <p className="font-medium mb-1">Drag & drop files here</p>
        <p className="text-sm text-muted-foreground mb-4">
          Upload up to {maxFiles} files (images, videos, PDFs)
        </p>
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" className="cursor-pointer" asChild>
            <span>Browse Files</span>
          </Button>
        </label>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" className="gap-2">
          <Cloud className="h-4 w-4" />
          Import from Cloud
        </Button>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <p className="text-sm font-medium">{uploadedFiles.length} file(s) selected</p>
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-10 h-10 object-cover rounded"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center">
                  {getFileIcon(file.file.type)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.file.size)}
                </p>
                {file.status === "uploading" && (
                  <Progress value={file.progress} className="h-1 mt-1" />
                )}
              </div>
              <div className="flex items-center gap-2">
                {file.status === "completed" && (
                  <span className="text-xs text-success">✓ Uploaded</span>
                )}
                {file.status === "error" && (
                  <span className="text-xs text-destructive">Failed</span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
