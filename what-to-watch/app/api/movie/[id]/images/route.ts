import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing movie id" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const url = new URL(`https://api.themoviedb.org/3/movie/${id}/images`);
    // Include English and language-agnostic images
    url.searchParams.set("include_image_language", "en,null");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      // Cache on the server for 24 hours
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(
        JSON.stringify({ error: "TMDB error", status: response.status, details: text }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: err?.message ?? String(err) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
