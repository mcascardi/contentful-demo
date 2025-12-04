import Link from 'next/link';

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to My Blog</h1>
            <p className="text-xl text-gray-600 mb-8">
            A Next.js + TypeScript + Contentful demo
        </p>
            <Link 
        href="/blog"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
            View Blog Posts
        </Link>
            </div>
    );
}
