import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";
import {
  deleteSharedJson,
  readSharedJson,
  writeSharedJson,
} from "@/lib/serverStorage";

export const dynamic = "force-dynamic";

const siteContentKey = "yj-developers:site-content";
const siteContentFile = "site-content.json";

function cleanContent(input: SiteContent) {
  return input;
}

export async function GET() {
  const content = await readSharedJson<SiteContent>(
    siteContentKey,
    siteContentFile,
    defaultSiteContent
  );

  return Response.json({ content });
}

export async function POST(request: Request) {
  const content = cleanContent((await request.json()) as SiteContent);

  await writeSharedJson(siteContentKey, siteContentFile, content);

  return Response.json({ content });
}

export async function DELETE() {
  await deleteSharedJson(siteContentKey, siteContentFile);

  return Response.json({ content: defaultSiteContent });
}
