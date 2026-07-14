import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function sanitizeContent(savedContent: SiteContent): SiteContent {
  if (!savedContent) return savedContent;

  // 1. Ensure services is initialized
  if (!savedContent.services) {
    savedContent.services = { ...defaultSiteContent.services };
  }
  if (!savedContent.services.items) {
    savedContent.services.items = [...defaultSiteContent.services.items];
  }

  return savedContent;
}

function cleanContent(input: SiteContent) {
  return sanitizeContent(input);
}

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return Response.json({ content: defaultSiteContent });
    }

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

    let savedContent = data.content as SiteContent;
    
    // Sanitize and clean categories / inject new services
    savedContent = sanitizeContent(savedContent);
    
    // Auto-merge new default portfolio items if they don't exist in saved content
    const existingTitles = new Set(savedContent.portfolio.items.map(i => i.title));
    const newItems = defaultSiteContent.portfolio.items.filter(i => !existingTitles.has(i.title));
    
    let hasChanges = false;
    if (newItems.length > 0) {
      savedContent.portfolio.items = [...savedContent.portfolio.items, ...newItems];
      hasChanges = true;
    }

    // Sync new official contact info if it's still the old placeholder
    if (savedContent.brand.email === "hello@yjdevelopers.com" || savedContent.brand.email === "contact@yjdevelopers.com") {
      savedContent.brand.email = defaultSiteContent.brand.email;
      hasChanges = true;
    }
    if (savedContent.brand.phone === "+91 98765 43210") {
      savedContent.brand.phone = defaultSiteContent.brand.phone;
      hasChanges = true;
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


