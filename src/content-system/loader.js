import { CONTENT_REGISTRY } from "./registry.js";
import { readLocal } from "./storage.js";
import { getContentRoot } from "./config.js";

export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  // 🧠 Production: Cloudflare KV
  if (env && env.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (stored) return stored;
    throw new Error(`Missing content in KV: ${entry.file}`);
  }

  // 🧪 Local dev: filesystem
  const root = getContentRoot();
  if (!root) {
    throw new Error("Content root not configured in local environment");
  }

  return await readLocal(root, entry.file);
}