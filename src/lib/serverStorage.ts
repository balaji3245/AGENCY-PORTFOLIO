import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), ".data");
const kvRestUrl =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const kvRestToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

function hasKvStorage() {
  return Boolean(kvRestUrl && kvRestToken);
}

async function kvCommand<T>(command: unknown[]) {
  if (!kvRestUrl || !kvRestToken) {
    throw new Error("KV storage is not configured.");
  }

  const response = await fetch(kvRestUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvRestToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  const payload = (await response.json()) as { result?: T; error?: string };

  if (!response.ok || payload.error) {
    throw new Error(payload.error ?? "KV command failed.");
  }

  return payload.result;
}

function getFilePath(fileName: string) {
  return path.join(dataDirectory, fileName);
}

export async function readSharedJson<T>(
  key: string,
  fileName: string,
  fallback: T
) {
  if (hasKvStorage()) {
    const value = await kvCommand<string | null>(["GET", key]);
    if (!value) return fallback;
    return JSON.parse(value) as T;
  }

  try {
    const fileContent = await readFile(getFilePath(fileName), "utf8");
    return JSON.parse(fileContent) as T;
  } catch {
    return fallback;
  }
}

export async function writeSharedJson<T>(
  key: string,
  fileName: string,
  value: T
) {
  const serializedValue = JSON.stringify(value);

  if (hasKvStorage()) {
    await kvCommand(["SET", key, serializedValue]);
    return;
  }

  await mkdir(dataDirectory, { recursive: true });
  await writeFile(getFilePath(fileName), JSON.stringify(value, null, 2));
}

export async function deleteSharedJson(key: string, fileName: string) {
  if (hasKvStorage()) {
    await kvCommand(["DEL", key]);
    return;
  }

  await rm(getFilePath(fileName), { force: true });
}
