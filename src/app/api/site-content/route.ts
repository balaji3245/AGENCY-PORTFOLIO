import { type SiteContent } from "@/lib/siteContent";
import { readContent, saveContent, deleteContent } from "@/lib/siteContentServer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const savedContent = await readContent();
    return Response.json({ content: savedContent });
  } catch (error) {
    console.error("Error in site-content GET:", error);
    // Safe fallback to readContent which returns defaultSiteContent on failure
    const fallback = await readContent();
    return Response.json({ content: fallback });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_session");
  if (!authCookie || authCookie.value !== "authenticated") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = (await request.json()) as SiteContent;
    await saveContent(content);

    // Clear cache to show new data immediately
    revalidatePath("/");

    return Response.json({ content });
  } catch (error) {
    console.error("Error in site-content POST:", error);
    return Response.json({ error: "Failed to save content" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_session");
  if (!authCookie || authCookie.value !== "authenticated") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteContent();

    revalidatePath("/");

    const freshContent = await readContent();
    return Response.json({ content: freshContent });
  } catch (error) {
    console.error("Error in site-content DELETE:", error);
    return Response.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
