let contentRoot = null;

export function setContentRoot(path) {
  contentRoot = path;
}

export function getContentRoot() {
  // When running on edge, we no longer require filesystem root.
  // Loader will use import.meta.glob instead.
  return contentRoot;
}