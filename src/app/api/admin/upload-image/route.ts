import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  // 1. Verify session
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_session");
  if (!authCookie || authCookie.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = (formData.get("bucket") as string) || "portfolio";
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get unique file name
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const objectPath = `${timestamp}_${cleanFileName}`;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("Supabase not configured. Returning dummy upload URL.");
      return NextResponse.json({
        success: true,
        url: `https://via.placeholder.com/800x600?text=${encodeURIComponent(cleanFileName)}`,
        path: objectPath
      });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(objectPath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(objectPath);

    return NextResponse.json({ 
      success: true, 
      url: data.publicUrl,
      path: objectPath 
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload image" }, { status: 500 });
  }
}
