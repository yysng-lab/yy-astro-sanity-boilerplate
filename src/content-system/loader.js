import fs from "fs/promises";
import path from "path";
import { CONTENT_REGISTRY } from "./registry.js";
import { getContentRoot } from "./config.js";

export async function loadContent(key) {
  const entry = CONTENT_REGISTRY[key];
  if (!entry) throw new Error(`Unknown content key: ${key}`);

  const filePath = path.join(getContentRoot(), entry.file);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}