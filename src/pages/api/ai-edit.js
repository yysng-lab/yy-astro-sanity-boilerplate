import { updateContent } from "@yysng/astro-boilerplate";

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { section, content } = body;

    if (!section || !content) {
      return new Response(
        JSON.stringify({ error: "Missing section or content" }),
        { status: 400 }
      );
    }

    await updateContent(section, content);

    return new Response(
      JSON.stringify({ status: "ok", updated: section }),
      { status: 200 }
    );

  } catch (error) {
    console.error("AI Edit Error:", error);

    return new Response(
      JSON.stringify({
        error: "Internal error",
        details: error.message
      }),
      { status: 500 }
    );
  }
}
