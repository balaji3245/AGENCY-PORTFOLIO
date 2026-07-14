import { revalidatePath } from "next/cache";
import { type SiteContent } from "@/lib/siteContent";
import { readContent, saveContent } from "@/lib/siteContentServer";

export async function POST(request: Request) {
  try {
    const newReview = await request.json();

    // 1. Fetch current content using server helper (handles local fallback)
    const currentContent = await readContent();

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

    // 3. Save back (handles local fallback)
    await saveContent(currentContent);

    // 4. Revalidate
    revalidatePath("/");

    return Response.json({ success: true, review: reviewWithMeta });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return Response.json({ error: "Failed to post review" }, { status: 500 });
  }
}
