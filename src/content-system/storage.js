import fs from "fs/promises";
import path from "path";
import { getContentRoot } from "./config.js";

export async function readLocal(file) {
  const root = getContentRoot();
  if (!root) throw new Error("Content root not configured");

  const filePath = path.join(root, file);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function writeLocal(file, data) {
  const root = getContentRoot();
  if (!root) throw new Error("Content root not configured");

  const filePath = path.join(root, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}