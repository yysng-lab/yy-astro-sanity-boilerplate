import { CONTENT_REGISTRY } from "./registry.js";
import { readLocal } from "@yysng/astro-boilerplate/content-storage";

export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  // Edge → KV only
  if (env?.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (!stored) throw new Error(`KV missing content for key "${key}"`);
    return stored;
  }

  // Node → filesystem only
  return readLocal(entry.file, env);
}