export function buildBlogPostingSchema({ title, image, publishedAt, modifiedAt }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": image,
    "datePublished": publishedAt,
    "dateModified": modifiedAt || publishedAt
  };
}
