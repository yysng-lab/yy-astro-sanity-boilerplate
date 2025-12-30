import { schemas } from "./schemas.js";
import { loadContent } from "./loader.js";
import { CONTENT_REGISTRY } from "./registry.js";

const isEdge = typeof process === "undefined";

// IMPORTANT:
// - On edge, never import node storage.
// - Use @vite-ignore + variable specifier to avoid bundling node fs into worker.
async function getStorage() {
  if (isEdge) {
    const p = "@yysng/astro-boilerplate/content-storage/edge";
    return await import(/* @vite-ignore */ p);
  } else {
    const p = "@yysng/astro-boilerplate/content-storage/node";
    return await import(/* @vite-ignore */ p);
  }
}

function mergeDefined(existing, incoming) {
  const result = { ...existing };
  for (const k in incoming) {
    const v = incoming[k];
    if (v === undefined) continue;

    if (typeof v === "object" && v && !Array.isArray(v)) {
      result[k] = mergeDefined(existing[k] || {}, v);
    } else {
      result[k] = v;
    }
  }
  return result;
}

export async function updateContent(key, incoming, env = {}) {
  const schema = schemas[key];
  if (!schema) throw new Error(`No schema for ${key}`);

  const entry = CONTENT_REGISTRY[key];
  const existing = await loadContent(key, env);
  const merged = mergeDefined(existing, incoming);

  schema.validate(merged);

  // Cloudflare KV
  if (env?.CONTENT_KV) {
    await env.CONTENT_KV.put(entry.file, JSON.stringify(merged));
    return merged;
  }

  // Edge must never write local
  if (isEdge) {
    throw new Error(
      `Edge runtime missing CONTENT_KV binding for updateContent("${key}").`
    );
  }

  // Local dev filesystem write
  const { writeLocal } = await getStorage();
  await writeLocal(entry.file, merged);
  return merged;
}