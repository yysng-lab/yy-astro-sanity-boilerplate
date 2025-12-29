let contentRoot = null;

export function setContentRoot(path) {
  contentRoot = path;
  globalThis.__CONTENT_ROOT__ = path;
}

export function getContentRoot() {
  return contentRoot;
}