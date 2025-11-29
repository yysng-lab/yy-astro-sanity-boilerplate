import { sanityClient } from "@lib/sanityClient";

export async function fetchFromSanity(query: string, params: Record<string, any> = {}) {
  return sanityClient.fetch(query, params);
}
