import { promises as fs } from "fs";
import path from "path";
import { defaultSiteContent, type SiteContent } from "./siteContent";
import { supabase } from "./supabase";

const LOCAL_FILE_PATH = path.join(process.cwd(), "src/lib/site-content-local.json");

function sanitizeContent(savedContent: SiteContent): SiteContent {
  if (!savedContent) return savedContent;
  
  if (!savedContent.services) {
    savedContent.services = { ...defaultSiteContent.services };
  }
  if (!savedContent.services.items) {
    savedContent.services.items = [...defaultSiteContent.services.items];
  }
  return savedContent;
}

export async function readContent(): Promise<SiteContent> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "yj-developers:site-content")
        .single();

      if (!error && data?.content) {
        let savedContent = data.content as SiteContent;
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

        return savedContent;
      }
    } catch (error) {
      console.error("Error fetching site content from Supabase, using fallback:", error);
    }
  }

  // Local file fallback
  try {
    const fileExists = await fs.access(LOCAL_FILE_PATH).then(() => true).catch(() => false);
    if (fileExists) {
      const fileData = await fs.readFile(LOCAL_FILE_PATH, "utf8");
      let localContent = JSON.parse(fileData) as SiteContent;
      return sanitizeContent(localContent);
    }
  } catch (error) {
    console.error("Error reading local site content:", error);
  }

  return defaultSiteContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  const cleanedContent = sanitizeContent(content);

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { error } = await supabase.from("site_content").upsert({
      id: "yj-developers:site-content",
      content: cleanedContent,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
  } else {
    // Local file save
    await fs.writeFile(LOCAL_FILE_PATH, JSON.stringify(cleanedContent, null, 2), "utf8");
  }
}

export async function deleteContent(): Promise<void> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { error } = await supabase
      .from("site_content")
      .delete()
      .eq("id", "yj-developers:site-content");
    if (error) throw error;
  } else {
    try {
      await fs.unlink(LOCAL_FILE_PATH);
    } catch {}
  }
}
