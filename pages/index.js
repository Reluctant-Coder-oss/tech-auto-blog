import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'posts/generated');
  const files = fs.readdirSync(dir);

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(path.join(dir, filename), 'utf-8');
    const title = content.split('\n')[0].replace('# ', '');
    return { slug, title };
  });

  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🔌 Tech AutoBlog</h1>
      {posts.map(post => (
        <Link key={post.slug} href={`/post/${post.slug}`}>
          <div className="border-b py-2 hover:underline cursor-pointer">
            {post.title}
          </div>
        </Link>
      ))}
    </main>
  );
}
