import { CONTENT_REGISTRY } from "./registry.js";
import { readLocal } from "./storage.js";

export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  // Cloudflare production: KV only
  if (env?.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (!stored) {
      throw new Error(`KV missing content: ${entry.file}`);
    }
    return stored;
  }

  // Node.js local dev only
  if (typeof process !== "undefined" && process.versions?.node) {
    return await readLocal(entry.file);
  }

  throw new Error("Content system misconfigured: no KV and no local FS allowed");
}