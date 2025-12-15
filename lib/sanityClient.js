import { createClient } from "@sanity/client";

/**
 * ENV LOADING
 * Safe fallback and warning for missing envs.
 */
const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;
const apiVersion = import.meta.env.SANITY_API_VERSION || "2023-10-01";

const readToken = import.meta.env.SANITY_READ_TOKEN;
const writeToken = import.meta.env.SANITY_WRITE_TOKEN; // for AI editing + image upload

if (!projectId || !dataset) {
  console.warn("⚠️ sanityClient: Missing SANITY_PROJECT_ID or SANITY_DATASET");

  // Safe null client
  export const sanityClient = {
    fetch: async () => null,
    getDocument: async () => null,
    patch: () => ({
      set: () => ({ commit: async () => null }),
    }),
  };
  export const sanityWriteClient = sanityClient;
  export const uploadImageToSanity = async () => null;
  export const uploadFileToSanity = async () => null;

  return;
}

/**
 * READ-ONLY CLIENT
 * Uses CDN + read token (optional)
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast reads
  token: readToken || undefined,
  perspective: "published",
});

/**
 * WRITE CLIENT (for AI Editing)
 * Must use token + no CDN
 */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken, // MUST be set for mutations + uploads
  perspective: "published",
});

/**
 * IMAGE UPLOAD HELPER
 * Accepts: Buffer, Blob, File, base64 string
 */
export async function uploadImageToSanity(file, filename = "upload.jpg") {
  try {
    const asset = await sanityWriteClient.assets.upload("image", file, {
      filename,
      creditLine: "Uploaded via AI Editor",
    });

    return {
      assetId: asset._id,
      url: asset.url,
      metadata: asset.metadata,
    };
  } catch (err) {
    console.error("❌ Sanity image upload failed:", err);
    throw err;
  }
}

/**
 * FILE UPLOAD HELPER (optional)
 * For PDFs, logos, docs.
 */
export async function uploadFileToSanity(file, filename = "file") {
  try {
    const asset = await sanityWriteClient.assets.upload("file", file, {
      filename,
    });

    return {
      assetId: asset._id,
      url: asset.url,
    };
  } catch (err) {
    console.error("❌ Sanity file upload failed:", err);
    throw err;
  }
}

/**
 * PATCH DOCUMENT HELPER (AI Editing)
 * Example usage:
 *   await patchDocument("homePage", { title: "New Title" });
 */
export async function patchDocument(docId, data) {
  try {
    return await sanityWriteClient
      .patch(docId)
      .set(data)
      .commit();
  } catch (err) {
    console.error(`❌ Sanity patch failed for ${docId}:`, err);
    throw err;
  }
}
