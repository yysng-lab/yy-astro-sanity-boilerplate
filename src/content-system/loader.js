// src/content-system/loader.js

const contentModules = import.meta.glob(
  '/src/content/*.json',
  { eager: true }
);

export function loadContent(key) {
  const path = `/src/content/${key}.json`;
  const mod = contentModules[path];

  if (!mod || !mod.default) {
    throw new Error(`Content not found: ${path}`);
  }

  return mod.default;
}
