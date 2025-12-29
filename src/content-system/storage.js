// storage.js — runtime dispatcher

export async function readLocal(file, env) {
  if (env?.CONTENT_KV) {
    throw new Error("readLocal should not be called on Edge");
  }
  const { readLocal: nodeRead } = await import("./storage.node.js");
  return nodeRead(file);
}

export async function writeLocal(file, data, env) {
  if (env?.CONTENT_KV) {
    throw new Error("writeLocal should not be called on Edge");
  }
  const { writeLocal: nodeWrite } = await import("./storage.node.js");
  return nodeWrite(file, data);
}