import { getPostBySlug, getAllPosts } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import LikeButton from '@/app/components/LikeButton';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 mb-6">
        <p className="text-gray-600">
          {new Date(post.publishDate).toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        {post.body.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4">{paragraph}</p>
        ))}
      </div>

      <div className="border-t pt-6">
        <LikeButton slug={post.slug} />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
