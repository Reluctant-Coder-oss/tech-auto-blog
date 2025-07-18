import fs from 'fs';
import path from 'path';

export async function getServerSideProps({ res }) {
  const files = fs.readdirSync('posts/generated');
  const urls = files.map(f => f.replace('.md', ''));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `
    <url>
      <loc>https://yourdomain.com/post/${u}</loc>
    </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() { return null; }
