let fs, path;

if (typeof process !== "undefined" && process.versions?.node) {
  fs = await import("fs/promises");
  path = await import("path");
}

export async function readLocal(file) {
  if (!fs || !path) {
    throw new Error("Filesystem not available in this runtime");
  }

  const root = globalThis.__CONTENT_ROOT__;
  const filePath = path.join(root, file);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function writeLocal(file, data) {
  if (!fs || !path) {
    throw new Error("Filesystem not available in this runtime");
  }

  const root = globalThis.__CONTENT_ROOT__;
  const filePath = path.join(root, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}