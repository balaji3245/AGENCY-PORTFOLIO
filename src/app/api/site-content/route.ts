import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function cleanContent(input: SiteContent) {
  return input;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "yj-developers:site-content")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return Response.json({ content: defaultSiteContent });
      }
      throw error;
    }

    const savedContent = data.content as SiteContent;
    
    // Auto-merge new default portfolio items if they don't exist in saved content
    const existingTitles = new Set(savedContent.portfolio.items.map(i => i.title));
    const newItems = defaultSiteContent.portfolio.items.filter(i => !existingTitles.has(i.title));
    
    if (newItems.length > 0) {
      savedContent.portfolio.items = [...savedContent.portfolio.items, ...newItems];
    }

    return Response.json({ content: savedContent });
  } catch (error) {
    console.error("Error fetching site content:", error);
    return Response.json({ content: defaultSiteContent });
  }
}

export async function POST(request: Request) {
  const content = cleanContent((await request.json()) as SiteContent);

  try {
    const { error } = await supabase.from("site_content").upsert({
      id: "yj-developers:site-content",
      content,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    // Clear cache to show new data immediately
    revalidatePath("/");

    return Response.json({ content });
  } catch (error) {
    console.error("Error saving site content:", error);
    return Response.json({ error: "Failed to save content" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const { error } = await supabase
      .from("site_content")
      .delete()
      .eq("id", "yj-developers:site-content");

    if (error) throw error;

    revalidatePath("/");

    return Response.json({ content: defaultSiteContent });
  } catch {
    return Response.json({ error: "Failed to delete content" }, { status: 500 });
  }
}


