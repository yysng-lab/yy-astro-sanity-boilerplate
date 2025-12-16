let CONTENT_ROOT = null;

export function setContentRoot(path) {
  CONTENT_ROOT = path;
}

export function getContentRoot() {
  if (!CONTENT_ROOT) {
    throw new Error("Content root not configured. Call setContentRoot() from the site.");
  }
  return CONTENT_ROOT;
}