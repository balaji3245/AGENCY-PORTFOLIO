import type {
  ContactSubmission,
  ContactSubmissionInput,
} from "@/lib/contactSubmissions";
import { sendContactSubmissionEmail } from "@/lib/contactEmail";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function cleanSubmission(input: Partial<ContactSubmissionInput>) {
  return {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    message: String(input.message ?? "").trim(),
    source: (input.source === "start-project" ? "start-project" : input.source === "review" ? "review" : "contact") as "contact" | "start-project" | "review",
  };
}

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_session");
  if (!authCookie || authCookie.value !== "authenticated") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return Response.json({ submissions: [] });
    }

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json({ submissions: data });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to read contact submissions.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let input: ReturnType<typeof cleanSubmission>;

  try {
    input = cleanSubmission(await request.json());
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!input.name || !input.email || !input.message) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase not configured. Skipping contact submission save.");
      const tempSubmission = { ...input, id: "temp-id", created_at: new Date().toISOString() };
      return Response.json({ submission: tempSubmission, email: { sent: false, reason: "Database not configured" } }, { status: 201 });
    }

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([input])
      .select()
      .single();

    if (error) throw error;

    const submission = data as ContactSubmission;

    const email = await sendContactSubmissionEmail(submission).catch(
      (error) => ({
        sent: false,
        reason:
          error instanceof Error ? error.message : "Unable to send email.",
      })
    );

    if (!email.sent) {
      console.error("Contact email delivery failed:", {
        reason: email.reason,
        submissionId: submission.id,
        recipient: process.env.CONTACT_TO_EMAIL,
      });
    }

    return Response.json({ submission, email }, { status: 201 });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save contact submission.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_session");
  if (!authCookie || authCookie.value !== "authenticated") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase not configured. Skipping delete.");
      return Response.json({ ok: true });
    }

    if (!id) {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

      if (error) throw error;
      return Response.json({ ok: true });
    }

    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to delete contact submission.",
      },
      { status: 500 }
    );
  }
}

