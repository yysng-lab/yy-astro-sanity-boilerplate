import { schemas } from "./schemas.js";
import { loadContent } from "./loader.js";
import { writeLocal }from "@yysng/astro-boilerplate/content-storage";
import { CONTENT_REGISTRY } from "./registry.js";

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

  if (env?.CONTENT_KV) {
    await env.CONTENT_KV.put(entry.file, JSON.stringify(merged));
    return merged;
  }

  await writeLocal(entry.file, merged, env);
  return merged;
}