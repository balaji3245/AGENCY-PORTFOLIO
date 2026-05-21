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

  // 2. Map old/duplicate category names in portfolio items to the clean/canonical names
  if (savedContent.portfolio && savedContent.portfolio.items) {
    savedContent.portfolio.items = savedContent.portfolio.items.map((item) => {
      let category = item.category || "";
      
      // Trim and normalize
      category = category.trim();
      
      if (category === "Web & App Development" || category === "Website Development" || category === "App Development") {
        category = "Web Development";
      } else if (category === "Website Design") {
        category = "UI/UX Design";
      } else if (category === "Digital Marketing & SEO" || category === "Content Strategy" || category === "Marketing Design Assets") {
        category = "Digital Marketing";
      } else if (category === "Cloud & Software Solutions") {
        category = "Cloud & DevOps";
      } else if (category === "Brand Strategy & Design" || category === "Branding & Creative Solutions" || category === "Social Media Creative Design" || category === "Content Creation" || category === "Creative Direction") {
        category = "Graphic Design";
      }
      
      return { ...item, category };
    });
  }

  // 3. Ensure the new creative services (Motion Graphics, Video Editing, Photo Editing) are in services.items
  const existingServiceTitles = new Set(savedContent.services.items.map((s) => s.title));
  
  const newServicesToAdd = [
    {
      title: "Motion Graphics",
      description: "We bring your brand ideas to life with stunning 2D/3D motion design and dynamic animations.",
      icon: "zap" as const,
      features: ["Logo Animation", "Explainer Videos", "UI Transitions", "3D Product Renders"]
    },
    {
      title: "Video Editing",
      description: "Professional video editing and post-production to create engaging and cinematic visual stories.",
      icon: "monitor" as const,
      features: ["Cinematic Editing", "Color Grading", "Sound Design & Mixing", "Social Media Ads"]
    },
    {
      title: "Photo Editing",
      description: "High-end photo manipulation, retouching, and color correction to showcase your products beautifully.",
      icon: "paintbrush" as const,
      features: ["Product Retouching", "Background Removal", "Color Correction", "Image Manipulation"]
    }
  ];

  for (const newService of newServicesToAdd) {
    if (!existingServiceTitles.has(newService.title)) {
      savedContent.services.items.push(newService);
    }
  }

  return savedContent;
}

function cleanContent(input: SiteContent) {
  return sanitizeContent(input);
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


