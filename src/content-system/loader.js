import { CONTENT_REGISTRY } from "./registry.js";

const isEdge = typeof process === "undefined";

export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  // Cloudflare runtime (KV)
  if (env?.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (stored) return stored;
    throw new Error(`KV missing content for key "${key}"`);
  }

  // 🚨 Edge runtime must NEVER attempt local filesystem
  if (isEdge) {
    throw new Error(
      `Edge runtime missing CONTENT_KV binding for "${key}". ` +
      `Make sure you pass Astro.locals.runtime.env into loadContent() and your Pages project has CONTENT_KV bound.`
    );
  }

  // Local dev only — prevent bundling into Worker by using @vite-ignore + variable specifier
  const modPath = "./storage.node.js";
  const { readLocal } = await import(/* @vite-ignore */ modPath);
  return await readLocal(entry.file);
}