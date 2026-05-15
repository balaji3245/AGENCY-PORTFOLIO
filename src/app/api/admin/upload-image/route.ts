import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_FOLDERS = new Set(["brand", "portfolio"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_session");

  if (!authCookie || authCookie.value !== "authenticated") {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folderValue = String(formData.get("folder") ?? "portfolio");
  const folder = ALLOWED_FOLDERS.has(folderValue) ? folderValue : "portfolio";

  if (!(file instanceof File)) {
    return Response.json({ error: "Image file is required." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return Response.json(
      { error: "Image must be 5MB or smaller." },
      { status: 400 }
    );
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "site-assets";
    const fileExt = file.name.includes(".") ? file.name.split(".").pop() : "png";
    const fileName = sanitizeFileName(file.name.replace(/\.[^.]+$/, ""));
    const objectPath = `${folder}/${Date.now()}-${fileName}.${fileExt}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(objectPath, Buffer.from(arrayBuffer), {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(objectPath);

    return Response.json({
      path: objectPath,
      url: data.publicUrl,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to upload image.",
      },
      { status: 500 }
    );
  }
}
