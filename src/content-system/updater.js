import fs from "fs/promises";
import path from "path";
import { CONTENT_REGISTRY } from "./registry.js";
import { schemas } from "./schemas.js";
import { getContentRoot } from "./config.js";


function logAuditEvent({ section, incoming, merged }) {
  const timestamp = new Date().toISOString();

  console.log("[AI-EDIT]", {
    section,
    timestamp,
    incoming, // what AI attempted to change
    result: merged // final persisted state
  });
}

/**
 * Merge only defined values from `incoming` into `existing`.
 * - Undefined fields do NOT overwrite existing values
 * - Nested objects (e.g. CTA) are merged recursively
 */
function mergeDefined(existing, incoming) {
  const result = { ...existing };

  for (const key of Object.keys(incoming)) {
    const value = incoming[key];

    // Skip undefined (true partial update behavior)
    if (value === undefined) continue;

    // Recursively merge objects (but not arrays)
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      result[key] = mergeDefined(existing[key] || {}, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export async function updateContent(key, incoming) {
  if (!incoming || typeof incoming !== "object") {
    throw new Error("Incoming content must be an object");
  }

  const entry = CONTENT_REGISTRY[key];
  if (!entry) {
    throw new Error(`Unknown content key: ${key}`);
  }

  const schema = schemas[key];
  if (!schema) {
    throw new Error(`No schema defined for content key: ${key}`);
  }

  const filePath = path.join(getContentRoot(), entry.file);

  let existing = {};
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(raw);
  } catch {}

  const merged = mergeDefined(existing, incoming);

  schema.validate(merged);

  logAuditEvent({
    section: key,
    incoming,
    merged
  });

  await fs.writeFile(
    filePath,
    JSON.stringify(merged, null, 2),
    "utf-8"
  );
}