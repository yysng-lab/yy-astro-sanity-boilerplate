import fs from "fs/promises";
import path from "path";
import { CONTENT_REGISTRY } from "./registry.js";
import { schemas } from "./schemas.js";
import { getContentRoot } from "./config.js";

export async function updateContent(key, data) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  const schema = schemas[key];
  if (!schema) throw new Error(`No schema for ${key}`);
  schema.validate(data);

  const filePath = path.join(getContentRoot(), entry.file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}