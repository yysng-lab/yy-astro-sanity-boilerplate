import { CONTENT_REGISTRY } from "./registry.js";

export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  // Cloudflare runtime
  if (env?.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (stored) return stored;
    throw new Error(`KV missing content for key "${key}"`);
  }

  // Local dev — dynamic import prevents fs from entering Worker bundle
  const { readLocal } = await import("./storage.node.js");
  return await readLocal(entry.file);
}