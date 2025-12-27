import { CONTENT_REGISTRY } from "./registry.js";
import { readLocal } from "./storage.js";

export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  // Production: Cloudflare KV
  if (env?.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (stored) return stored;
    throw new Error(`KV missing content for key "${key}" (${entry.file})`);
  }

  // Local dev: filesystem
  return await readLocal(entry.file);
}