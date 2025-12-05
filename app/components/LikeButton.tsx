'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  slug: string;
}

export default function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current like count from Lambda
    const fetchLikes = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual Lambda URL once created
        // const response = await fetch(`${process.env.NEXT_PUBLIC_LAMBDA_URL}?slug=${slug}`);
        // const data = await response.json();
        // setLikes(data.likes);

        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 300));
        setLikes(Math.floor(Math.random() * 50));

        // Check if user already liked (using localStorage)
        const liked = localStorage.getItem(`liked-${slug}`) === 'true';
        setHasLiked(liked);
      } catch (error) {
        console.error('Error fetching likes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked) return; // Prevent multiple likes

    try {
      setLoading(true);

      // TODO: Replace with actual Lambda URL once created
      // const response = await fetch(process.env.NEXT_PUBLIC_LAMBDA_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ slug, action: 'like' })
      // });
      // const data = await response.json();
      // setLikes(data.likes);

      // Mock increment for now
      await new Promise(resolve => setTimeout(resolve, 300));
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem(`liked-${slug}`, 'true');
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        disabled={loading || hasLiked}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition
          ${hasLiked 
            ? 'bg-pink-100 text-pink-700 cursor-not-allowed' 
            : 'bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
          }
          disabled:opacity-50
        `}
      >
        <span className="text-xl">{hasLiked ? '❤️' : '🤍'}</span>
        <span>{loading ? '...' : likes}</span>
      </button>
      {hasLiked && (
        <span className="text-sm text-gray-500">Thanks for the like!</span>
      )}
    </div>
  );
}
