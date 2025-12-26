// src/content-system/loader.js

import hero from "../content/hero.json";
import cta from "../content/cta.json";
import about from "../content/about.json";
import testimonials from "../content/testimonials.json";

const CONTENT_CACHE = {
  hero,
  cta,
  about,
  testimonials
};

export function loadContent(key) {
  const data = CONTENT_CACHE[key];

  if (!data) {
    throw new Error(`Unknown content key: ${key}`);
  }

  return data;
}
