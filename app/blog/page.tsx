import Link from 'next/link';
import { getAllPosts } from '@/lib/contentful';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.slug} className="border rounded-lg p-6 hover:shadow-lg transition">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 text-blue-600 hover:text-blue-800">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              {new Date(post.publishDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 line-clamp-3">
              {post.body.substring(0, 150)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}