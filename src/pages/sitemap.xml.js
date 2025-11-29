import { fetchFromSanity } from "@utils/fetchFromSanity";
import { siteConfig } from "@config/site.config";

export async function GET() {
  const posts = await fetchFromSanity(`*[_type=="post"]{ "slug": slug.current }`);

  const urls = posts.map(
    (p) => `<url><loc>${siteConfig.siteUrl}/blog/${p.slug}</loc></url>`
  ).join("");

  return new Response(
    `<?xml version="1.0"?><urlset>${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
