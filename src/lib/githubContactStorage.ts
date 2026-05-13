import type { ContactSubmission } from "@/lib/contactSubmissions";
import { readSharedJson, writeSharedJson } from "@/lib/serverStorage";

type GitHubFileResponse = {
  content?: string;
  encoding?: string;
  sha?: string;
};

const fallbackKey = "yj-developers:contact-submissions";
const fallbackFile = "contact-submissions.json";
const defaultRepo = "balaji3245/AGENCY-PORTFOLIO";
const defaultPath = "data/contact-submissions.json";

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? defaultRepo;
  const path = process.env.GITHUB_CONTACTS_PATH ?? defaultPath;
  const branch = process.env.GITHUB_BRANCH;

  return {
    token,
    repo,
    path,
    branch,
    isConfigured: Boolean(token && repo && path),
  };
}

function shouldUseLocalFallback() {
  return process.env.NODE_ENV !== "production";
}

function apiUrl(repo: string, filePath: string, branch?: string) {
  const url = new URL(
    `https://api.github.com/repos/${repo}/contents/${filePath
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`
  );

  if (branch) {
    url.searchParams.set("ref", branch);
  }

  return url;
}

async function githubRequest<T>(
  url: URL,
  token: string,
  init: RequestInit = {}
) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  const payload = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(payload.message ?? "GitHub request failed.");
  }

  return payload;
}

async function readFromGitHub() {
  const config = getGitHubConfig();

  if (!config.isConfigured) {
    if (shouldUseLocalFallback()) {
      return readSharedJson<ContactSubmission[]>(
        fallbackKey,
        fallbackFile,
        []
      );
    }

    throw new Error("GitHub contact storage is not configured.");
  }

  const file = await githubRequest<GitHubFileResponse>(
    apiUrl(config.repo, config.path, config.branch),
    config.token!
  );

  if (!file?.content) {
    return [];
  }

  const normalized = file.content.replace(/\n/g, "");
  return JSON.parse(Buffer.from(normalized, "base64").toString("utf8")) as
    | ContactSubmission[]
    | [];
}

export async function readContactSubmissions() {
  return readFromGitHub();
}

export async function writeContactSubmissions(
  submissions: ContactSubmission[]
) {
  const config = getGitHubConfig();

  if (!config.isConfigured) {
    if (shouldUseLocalFallback()) {
      await writeSharedJson(fallbackKey, fallbackFile, submissions);
      return;
    }

    throw new Error("GitHub contact storage is not configured.");
  }

  const currentFile = await githubRequest<GitHubFileResponse>(
    apiUrl(config.repo, config.path, config.branch),
    config.token!
  );
  const content = Buffer.from(
    `${JSON.stringify(submissions, null, 2)}\n`,
    "utf8"
  ).toString("base64");
  const body: Record<string, string> = {
    message: "Update contact submissions",
    content,
  };

  if (currentFile?.sha) {
    body.sha = currentFile.sha;
  }

  if (config.branch) {
    body.branch = config.branch;
  }

  await githubRequest(apiUrl(config.repo, config.path), config.token!, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
