import fs from "fs/promises";
import { CONTENT_REGISTRY } from "./registry.js";

export async function loadContent(key) {
  const entry = CONTENT_REGISTRY[key];

  if (!entry) {
    throw new Error(`Unknown content key: ${key}`);
  }

  const fileUrl = new URL(`../${entry.file}`, import.meta.url);
  const raw = await fs.readFile(fileUrl, "utf-8");
  const data = JSON.parse(raw);

  return data;
}
