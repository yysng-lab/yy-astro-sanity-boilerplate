import { CONTENT_REGISTRY } from "./registry.js";
import { readLocal } from "./storage.js";

// Edge-safe bundled content (used when no filesystem)
const edgeContent = import.meta.glob("/src/content/*.json", { eager: true });

export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  // 1️⃣ Cloudflare production: KV first
  if (env.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (stored) return stored;
  }

  // 2️⃣ Edge runtime fallback (no filesystem available)
  if (!env.CONTENT_ROOT) {
    const mod = edgeContent[`/src/content/${entry.file}`];
    if (!mod || !mod.default) {
      throw new Error(`Edge content not found: ${entry.file}`);
    }
    return mod.default;
  }

  // 3️⃣ Local Node development (filesystem)
  return await readLocal(env.CONTENT_ROOT, entry.file);
}