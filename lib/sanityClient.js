import { createClient } from "@sanity/client";
import { sanityConfig } from "@config/sanity.config";

export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: true
});
