import fs from "fs/promises";
import path from "path";
import { getContentRoot } from "./config.js";

/**
 * Local filesystem read (Node only)
 */
export async function readLocal(root, file) {
  const filePath = path.join(root, file);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

/**
 * Local filesystem write (Node only)
 */
export async function writeLocal(root, file, data) {
  const filePath = path.join(root, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}