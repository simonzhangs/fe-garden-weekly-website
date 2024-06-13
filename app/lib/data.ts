import { db } from "@vercel/postgres";

export async function insertInfoWeeklyLists(client: { sql: any; }, lists: any[]) {
  return await Promise.all(
    lists.map(async (list) => {
      return client.sql`
          INSERT INTO weekly_magazines (id, title, link, publish_date, content)
          VALUES (${list.id}, ${list.title}, ${list.link}, ${list.publish_date}, ${list.content})
          ON CONFLICT (id) DO NOTHING;
        `;
    })
  );
}

export async function fetchWeeklyByLink(link: string) {
  const client = await db.connect();
  const { rows } = await client.sql`SELECT content from weekly_magazines WHERE link=${link}`;
  // console.log('fetchWeeklyByLink', rows[0].content);
  return rows[0].content;
};

export async function fetchLatestWeekly() {
  const client = await db.connect();
  try {
    const { rows } = await client.sql`
      SELECT content
      FROM weekly_magazines
      ORDER BY publish_date DESC
      LIMIT 1
    `;
    // console.log('fetchLatestWeekly', rows[0].content);
    return rows[0]?.content;
  } finally {
    client.release();
  }
}

export async function fetchWeeklyLists() {
  try {
    const data = await db`
        SELECT *
        FROM weekly_magazines`;
    console.log("fetchWeeklyLists", data.rows);
    return data.rows;
  } catch (error) {
    console.error("fetchWeeklyLists Error:", error);
    throw new Error("Fail to fetch fetchWeeklyLists");
  }
}
