import { createClient } from "@sanity/client";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;

let sanityClient;

if (!projectId || !dataset) {
  console.warn(
    "⚠️ Boilerplate sanityClient: Missing SANITY env vars. Using NULL client."
  );

  sanityClient = {
    fetch: async () => null,
    getDocument: async () => null,
  };
} else {
  sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: import.meta.env.SANITY_API_VERSION || "2023-01-01",
    useCdn: true,
    token: import.meta.env.SANITY_READ_TOKEN,
    perspective: "published",
  });
}

export { sanityClient };