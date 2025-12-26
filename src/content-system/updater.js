// src/content-system/updater.js

import { schemas } from "./schemas.js";
import { loadContent } from "./loader.js";

function logAuditEvent({ section, incoming, merged }) {
  const timestamp = new Date().toISOString();

  console.log("[AI-EDIT]", {
    section,
    timestamp,
    incoming,
    result: merged
  });
}

function mergeDefined(existing, incoming) {
  const result = { ...existing };

  for (const key of Object.keys(incoming)) {
    const value = incoming[key];
    if (value === undefined) continue;

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

  const schema = schemas[key];
  if (!schema) {
    throw new Error(`No schema defined for content key: ${key}`);
  }

  // Load existing content (edge-safe)
  const existing = loadContent(key);

  const merged = mergeDefined(existing, incoming);

  schema.validate(merged);

  logAuditEvent({
    section: key,
    incoming,
    merged
  });

  // EDGE MODE: return merged result only
  return merged;
}
