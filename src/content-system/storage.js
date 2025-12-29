let storage;

if (typeof process !== "undefined" && process.versions?.node) {
  storage = await import("./storage.node.js");
} else {
  storage = await import("./storage.edge.js");
}

export const readLocal = storage.readLocal;
export const writeLocal = storage.writeLocal;