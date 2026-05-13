import type {
  ContactSubmission,
  ContactSubmissionInput,
} from "@/lib/contactSubmissions";
import { sendContactSubmissionEmail } from "@/lib/contactEmail";
import {
  readContactSubmissions,
  writeContactSubmissions,
} from "@/lib/githubContactStorage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function cleanSubmission(input: Partial<ContactSubmissionInput>) {
  return {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    message: String(input.message ?? "").trim(),
    source: (input.source === "start-project" ? "start-project" : "contact") as "contact" | "start-project",
  };
}

export async function GET() {
  try {
    const submissions = await readContactSubmissions();
    return Response.json({ submissions });
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

  const submission: ContactSubmission = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  try {
    const submissions = [submission, ...(await readContactSubmissions())];
    await writeContactSubmissions(submissions);
    const email = await sendContactSubmissionEmail(submission).catch(
      (error) => ({
        sent: false,
        reason:
          error instanceof Error ? error.message : "Unable to send email.",
      })
    );

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
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (!id) {
      await writeContactSubmissions([]);
      return Response.json({ ok: true });
    }

    const submissions = (await readContactSubmissions()).filter(
      (submission) => submission.id !== id
    );

    await writeContactSubmissions(submissions);

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
