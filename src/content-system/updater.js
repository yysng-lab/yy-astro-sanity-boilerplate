import fs from "fs/promises";
import { CONTENT_REGISTRY } from "./registry.js";
import { schemas } from "./schemas.js";

export async function updateContent(key, data) {
  const entry = CONTENT_REGISTRY[key];

  if (!entry) {
    throw new Error(`Unknown content key: ${key}`);
  }

  // 🔒 Schema validation
  const schema = schemas[key];
  if (!schema) {
    throw new Error(`No schema defined for content key: ${key}`);
  }

  schema.validate(data);

  const fileUrl = new URL(`../${entry.file}`, import.meta.url);

  await fs.writeFile(
    fileUrl,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}
