import type {
  ContactSubmission,
  ContactSubmissionInput,
} from "@/lib/contactSubmissions";
import { readSharedJson, writeSharedJson } from "@/lib/serverStorage";

export const dynamic = "force-dynamic";

const submissionsKey = "yj-developers:contact-submissions";
const submissionsFile = "contact-submissions.json";

async function readSubmissions() {
  return readSharedJson<ContactSubmission[]>(submissionsKey, submissionsFile, []);
}

async function writeSubmissions(submissions: ContactSubmission[]) {
  await writeSharedJson(submissionsKey, submissionsFile, submissions);
}

function cleanSubmission(input: Partial<ContactSubmissionInput>) {
  return {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    message: String(input.message ?? "").trim(),
  };
}

export async function GET() {
  const submissions = await readSubmissions();
  return Response.json({ submissions });
}

export async function POST(request: Request) {
  const input = cleanSubmission(await request.json());

  if (!input.name || !input.email || !input.phone || !input.message) {
    return Response.json(
      { error: "Name, email, phone, and message are required." },
      { status: 400 }
    );
  }

  const submission: ContactSubmission = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  const submissions = [submission, ...(await readSubmissions())];

  await writeSubmissions(submissions);

  return Response.json({ submission }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    await writeSubmissions([]);
    return Response.json({ ok: true });
  }

  const submissions = (await readSubmissions()).filter(
    (submission) => submission.id !== id
  );

  await writeSubmissions(submissions);

  return Response.json({ ok: true });
}
