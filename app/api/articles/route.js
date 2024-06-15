import { db } from "@vercel/postgres";

export async function GET() {
  const client = await db.connect();
  const { rows } =
    await client.sql`SELECT link from weekly_magazines ORDER BY publish_date`;
  const links = rows.map((row) => row.link);
  // console.log("GETGETGET", links);
  return new Response(JSON.stringify(links), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
