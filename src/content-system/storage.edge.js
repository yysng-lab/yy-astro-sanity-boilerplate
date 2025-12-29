export async function readLocal() {
  throw new Error("Local filesystem is not available in Edge runtime");
}

export async function writeLocal() {
  throw new Error("Local filesystem is not available in Edge runtime");
}