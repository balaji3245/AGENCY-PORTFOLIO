import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { type SiteContent, defaultSiteContent } from "@/lib/siteContent";

export async function POST(request: Request) {
  try {
    const newReview = await request.json();

    // 1. Fetch current content
    let currentContent: SiteContent = defaultSiteContent;
    let fetchError = null;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "yj-developers:site-content")
        .single();
      
      currentContent = data?.content || defaultSiteContent;
      fetchError = error;
    }

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    // 2. Append new review (auto-approve)
    const reviewWithMeta = {
      ...newReview,
      isApproved: true, // Direct visibility as requested
      date: newReview.date || new Date().toISOString(),
      helpfulCount: 0,
    };

    if (!currentContent.testimonials) {
      currentContent.testimonials = [];
    }

    currentContent.testimonials.unshift(reviewWithMeta);

    // 3. Save back to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error: saveError } = await supabase.from("site_content").upsert({
        id: "yj-developers:site-content",
        content: currentContent,
        updated_at: new Date().toISOString(),
      });
      if (saveError) throw saveError;
    } else {
      console.warn("Supabase not configured. Skipping testimonial save.");
    }



    // 4. Revalidate
    revalidatePath("/");

    return Response.json({ success: true, review: reviewWithMeta });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return Response.json({ error: "Failed to post review" }, { status: 500 });
  }
}
