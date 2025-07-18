import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const RAW_DIR = './posts/raw';
const OUT_DIR = './posts/generated';

async function rewriteArticle(article) {
  const prompt = `
You're a tech blogger. Rewrite the following article title in a fresh, engaging tone. 
Then write a ~300 word blog post, insert 1 Amazon affiliate product (a tech gadget), and end with a casual call to action.

Title: ${article.title}
URL: ${article.link}
`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4',
  });

  return completion.choices[0].message.content;
}

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs.readdirSync(RAW_DIR).slice(0, 5); // Limit per run

  for (const file of files) {
    const article = JSON.parse(fs.readFileSync(path.join(RAW_DIR, file)));
    const blogPost = await rewriteArticle(article);

    const slug = article.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    fs.writeFileSync(`${OUT_DIR}/${slug}.md`, blogPost);
    fs.unlinkSync(path.join(RAW_DIR, file));
  }

  console.log('✅ Rewritten articles saved to /posts/generated');
}

run();
