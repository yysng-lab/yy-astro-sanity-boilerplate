import { fetchFromSanity } from "@utils/fetchFromSanity";

export async function GET() {
  const posts = await fetchFromSanity(`*[_type=="post"]|order(publishedAt desc)[0...20]{
    title, "slug": slug.current, publishedAt
  }`);

  const items = posts.map(
    (p) => `
      <item>
        <title>${p.title}</title>
        <link>/blog/${p.slug}</link>
        <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      </item>`
  ).join("");

  return new Response(
    `<?xml version="1.0"?><rss version="2.0"><channel>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
