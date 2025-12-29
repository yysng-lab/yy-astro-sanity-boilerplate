import { CONTENT_REGISTRY } from "./registry.js";
import { readLocal } from "./storage.js";

export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  // Edge path — ONLY KV
  if (env?.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (!stored) throw new Error(`Missing KV content: ${entry.file}`);
    return stored;
  }

  // Local dev path — filesystem only
  return await readLocal(entry.file);
}