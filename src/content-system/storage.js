const isEdge = typeof process === "undefined";

let impl;

if (isEdge) {
  impl = await import("./storage.edge.js");
} else {
  impl = await import("./storage.node.js");
}

export const readLocal = impl.readLocal;
export const writeLocal = impl.writeLocal;