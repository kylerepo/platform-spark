import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

// Simulate fingerprint extraction from uploaded file
async function extractFingerprint(
  fileData: Uint8Array,
  fileType: string
): Promise<string | null> {
  console.log(`Extracting fingerprint from ${fileType} (${fileData.length} bytes)`);
  
  // In production, this would use actual steganography detection:
  // 1. For images: Extract LSB patterns from pixel data
  // 2. For videos: Analyze temporal patterns across frames
  // 3. For PDFs: Extract patterns from rendering instructions
  // 4. For audio: Analyze spectral watermark patterns
  
  // For now, we'll return null and rely on database matching
  // Real implementation would extract the embedded 256-bit fingerprint
  return null;
}

// Generate fingerprint from file content for matching
function generateContentHash(fileData: Uint8Array): string {
  let hash = 0;
  const sampleSize = Math.min(fileData.length, 10000);
  
  for (let i = 0; i < sampleSize; i++) {
    hash = ((hash << 5) - hash) + fileData[i];
    hash = hash & hash;
  }
  
  let pattern = "";
  for (let i = 0; i < 256; i++) {
    const seed = (hash + i * 31) % 1000;
    pattern += seed % 2 === 0 ? "1" : "0";
  }
  
  return pattern;
}

// Calculate similarity between two fingerprints
function calculateSimilarity(fp1: string, fp2: string): number {
  if (fp1.length !== fp2.length) return 0;
  
  let matches = 0;
  for (let i = 0; i < fp1.length; i++) {
    if (fp1[i] === fp2[i]) matches++;
  }
  
  return (matches / fp1.length) * 100;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contentType = req.headers.get("Content-Type") || "";
    
    let fileData: Uint8Array;
    let fileName = "unknown";
    let fileType = "application/octet-stream";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      
      if (!file) {
        return new Response(
          JSON.stringify({ error: "No file provided" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      fileData = new Uint8Array(await file.arrayBuffer());
      fileName = file.name;
      fileType = file.type;
    } else {
      // Handle JSON with base64 file
      const body = await req.json();
      if (!body.fileData) {
        return new Response(
          JSON.stringify({ error: "No file data provided" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const binaryString = atob(body.fileData);
      fileData = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        fileData[i] = binaryString.charCodeAt(i);
      }
      fileName = body.fileName || "unknown";
      fileType = body.fileType || "application/octet-stream";
    }

    console.log(`Verifying watermark for file: ${fileName} (${fileData.length} bytes)`);

    // Try to extract embedded fingerprint
    const extractedFingerprint = await extractFingerprint(fileData, fileType);
    
    // Generate content hash for matching
    const contentHash = generateContentHash(fileData);
    
    // Search for matching watermarked files in the database
    const { data: watermarkedFiles, error: searchError } = await supabase
      .from("watermark_files")
      .select(`
        id,
        file_name,
        file_type,
        file_size,
        metadata,
        created_at,
        job_id
      `)
      .eq("status", "completed")
      .not("metadata", "is", null);

    if (searchError) {
      console.error("Error searching watermarked files:", searchError);
      return new Response(
        JSON.stringify({ error: "Failed to search watermarks" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let bestMatch: VerificationResult = {
      verified: false,
      confidence: 0
    };

    for (const file of watermarkedFiles || []) {
      const metadata = file.metadata as Record<string, unknown>;
      if (!metadata?.fingerprint) continue;

      const storedFingerprint = metadata.fingerprint as string;
      
      // Compare with extracted fingerprint or content hash
      const fingerprintToCompare = extractedFingerprint || contentHash;
      const similarity = calculateSimilarity(fingerprintToCompare, storedFingerprint);
      
      // Also check file size similarity as additional verification
      const sizeDiff = Math.abs((file.file_size || 0) - fileData.length);
      const sizeMatch = sizeDiff < 1000; // Within 1KB tolerance
      
      // Boost confidence if size matches
      const adjustedConfidence = sizeMatch ? similarity * 1.1 : similarity * 0.9;
      
      if (adjustedConfidence > bestMatch.confidence) {
        // Fetch job name separately
        let jobName = "Unknown";
        const { data: jobData } = await supabase
          .from("watermark_jobs")
          .select("job_name")
          .eq("id", file.job_id)
          .single();
        
        if (jobData) {
          jobName = jobData.job_name;
        }
        
        bestMatch = {
          verified: adjustedConfidence >= 70, // 70% threshold for verification
          confidence: Math.min(Math.round(adjustedConfidence), 100),
          fingerprint: storedFingerprint.substring(0, 32) + "...",
          metadata: {
            creatorId: metadata.creatorId as string,
            timestamp: metadata.timestamp as string,
            platformPreset: metadata.platformPreset as string,
            watermarkType: metadata.watermarkType as string,
            customMetadata: metadata.customMetadata as string,
          },
          matchedFile: {
            id: file.id,
            fileName: file.file_name,
            jobId: file.job_id,
            jobName,
            createdAt: file.created_at || "",
          }
        };
      }
    }

    console.log(`Verification result: verified=${bestMatch.verified}, confidence=${bestMatch.confidence}%`);

    return new Response(
      JSON.stringify(bestMatch),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Verification error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
