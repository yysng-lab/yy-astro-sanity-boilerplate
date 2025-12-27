import { schemas } from "./schemas.js";
import { loadContent } from "./loader.js";
import { writeLocal } from "./storage.js";
import { CONTENT_REGISTRY } from "./registry.js";

function mergeDefined(existing, incoming) {
  const result = { ...existing };
  for (const key of Object.keys(incoming)) {
    const value = incoming[key];
    if (value === undefined) continue;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result[key] = mergeDefined(existing[key] || {}, value);
    } else {
      result[key] = value;
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

  await writeLocal(entry.file, merged);
  return merged;
}