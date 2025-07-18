import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const SOURCES = [
  'https://techcrunch.com',
  'https://thenextweb.com',
  'https://www.theverge.com/tech'
];

const OUT_DIR = './posts/raw';

async function scrapeSite(url) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const articles = [];
  $('a').each((i, el) => {
    const link = $(el).attr('href');
    const title = $(el).text();
    if (link && title && title.length > 10) {
      articles.push({ title, link });
    }
  });

  return articles;
}

async function scrapeAll() {
  const allArticles = [];

  for (const source of SOURCES) {
    const articles = await scrapeSite(source);
    allArticles.push(...articles);
  }

  const deduped = [...new Map(allArticles.map(item => [item.link, item])).values()];

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  deduped.forEach((a, i) => {
    const filename = `${OUT_DIR}/article-${Date.now()}-${i}.json`;
    fs.writeFileSync(filename, JSON.stringify(a, null, 2));
  });

  console.log(`✅ Scraped & saved ${deduped.length} articles`);
}

scrapeAll();
