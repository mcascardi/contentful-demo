import { getPostBySlug, getAllPosts } from '@/lib/contentful';

import { notFound } from 'next/navigation';

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
            <p className="text-gray-600 mb-8">
            {new Date(post.publishDate).toLocaleDateString()}
        </p>
            <div className="prose prose-lg max-w-none">
            {post.body.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
            ))}
        </div>
            </article>
    );
}

// This generates static paths for all blog posts at build time
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

