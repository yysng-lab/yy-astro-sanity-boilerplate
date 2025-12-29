// storage.js
let fs = null;
let path = null;

// Lazy-load Node modules ONLY when in Node
async function ensureNode() {
  if (fs && path) return;
  if (typeof process !== "undefined" && process.versions?.node) {
    fs = (await import("fs/promises")).default;
    path = (await import("path")).default;
  }
}

export async function readLocal(file) {
  await ensureNode();
  if (!fs || !path) {
    throw new Error("readLocal() called in non-Node environment");
  }

  const root = process.cwd() + "/src/content";
  const filePath = path.join(root, file);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function writeLocal(file, data) {
  await ensureNode();
  if (!fs || !path) {
    throw new Error("writeLocal() called in non-Node environment");
  }

  const root = process.cwd() + "/src/content";
  const filePath = path.join(root, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}