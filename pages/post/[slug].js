import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import { marked } from 'marked';

export async function getStaticPaths() {
  const files = fs.readdirSync('posts/generated');
  const paths = files.map(filename => ({
    params: { slug: filename.replace('.md', '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join('posts/generated', `${params.slug}.md`);
  const content = fs.readFileSync(filePath, 'utf-8');
  return { props: { content } };
}

export default function Post({ content }) {
  const html = marked(content);

  return (
    <article className="max-w-2xl mx-auto p-6">
      {/* Google AdSense */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

