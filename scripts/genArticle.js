const fs = require("fs").promises;
const marked = require("marked");
const { db } = require("@vercel/postgres");

async function insertInfoWeeklyLists(client, lists) {
  return await Promise.all(
    lists.map(async (list) => {
        return client.sql`
              INSERT INTO weekly_magazines (id, title, link, publish_date, content)
              VALUES (${list.id}, ${list.title}, ${list.link}, ${list.publish_date}, ${list.content})
              ON CONFLICT (id) DO NOTHING;
            `;
      
//       return client.sql`  
//     INSERT INTO weekly_magazines (id, title, link, publish_date, content)  
//     VALUES (${list.id}, ${list.title}, ${list.link}, ${list.publish_date}, ${list.content})  
//     ON CONFLICT (id)   
//     DO UPDATE SET   
//         title = EXCLUDED.title,  
//         link = EXCLUDED.link,  
//         publish_date = EXCLUDED.publish_date,  
//         content = EXCLUDED.content  
// `;
    })
  );
}

async function readAndStoreMarkdownFiles(folderPath, client) {
  try {
    const files = await fs.readdir(folderPath);
    const articles = [];
    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = `${folderPath}/${file}`;
        const content = await fs.readFile(filePath, "utf8");

        // 假设你的 Markdown 文件格式如下：
        // ---
        // id: 7
        // title: '#7前端后花园周刊'
        // link: '/weekly/7'
        // ---
        // 正文内容...

        // Markdown文件以YAML前导开始，然后是正文
        // 尝试匹配YAML前导内容
        const yamlMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (yamlMatch) {
          const yamlFrontMatter = yamlMatch[1].trim(); // YAML前导内容
          const markdownContent = yamlMatch[2].trim(); // Markdown正文内容

          // 使用YAML库（如js-yaml）来解析YAML前导内容（可选）
          // 但为了简单起见，这里我们仍然使用正则表达式
          const metadataMatch = yamlFrontMatter.match(
            /^id:\s+(\d+)\ntitle:\s+(.*?)\nlink:\s+(.*?)\npublish_date:\s+(.*?)$/m
          );
          if (metadataMatch) {
            metadataMatch.forEach((str, index) => {
              if (typeof str === "string") {
                // 使用正则表达式去除字符串两端的引号
                metadataMatch[index] = str.replace(/^['"]|['"]$/g, "");
              }
            });
            const [, id, title, link, publish_date] = metadataMatch;
            // const contentHtml = marked(markdownContent); // 将Markdown转换为HTML
            console.log("metadataMatch", id, title, link, publish_date);
            articles.push({
              id,
              title,
              title,
              link,
              publish_date,
              content: markdownContent,
            });
          }
        }
      }
    }
    await insertInfoWeeklyLists(client, articles);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const client = await db.connect();
  await readAndStoreMarkdownFiles("./weekly_magazines", client);
  await client.end();
}

main().catch((err) => {
  console.error("An error occurred while attempting to genArticle", err);
});
