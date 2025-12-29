export async function loadContent(key, env = {}) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  if (env?.CONTENT_KV) {
    const stored = await env.CONTENT_KV.get(entry.file, "json");
    if (!stored) throw new Error(`Missing KV content: ${entry.file}`);
    return stored;
  }

  // Only import storage on Node
  const { readLocal } = await import("./storage.js");
  return await readLocal(entry.file);
}