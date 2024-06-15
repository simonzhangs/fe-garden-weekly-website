const { db } = require('@vercel/postgres');

const magazine = [
    // {
    //   id: 1,
    //   title: '#1',
    //   link: 'user@nextmail.com',
    //   publish_date: '2024.06.10',
    //   content: '第一期测试内容'
    // },
  ];

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS weekly_magazines (  
        id SERIAL PRIMARY KEY,  
        title VARCHAR(255) NOT NULL,  
        link VARCHAR(500) NOT NULL,  
        publish_date DATE NOT NULL,  
        content TEXT NOT NULL,  
        author VARCHAR(100),  
        category VARCHAR(100),  
        tags VARCHAR(255)  
      );  
    `;

    console.log(`Created "weekly_magazines" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      magazine.map(async (magazine) => {
        return client.sql`
        INSERT INTO weekly_magazines (id, title, link, publish_date, content)
        VALUES (${magazine.id}, ${magazine.title}, ${magazine.link}, ${magazine.publish_date}, ${magazine.content})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${magazine.length} magazine`);

    // return {
    //   createTable,
    //   users: insertedUsers,
    // };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function deleteArticleById(client, id) {
  try {
    const  { rows } = await client.sql`DELETE from weekly_magazines WHERE id=${id}`;
    console.log('deleteArticleById',rows[0])
  } catch (error) {
    console.error('Error deleteArticleById:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedUsers(client);

  await deleteArticleById(client, 15);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
