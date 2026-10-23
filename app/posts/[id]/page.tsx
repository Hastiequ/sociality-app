'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PostCard from '@/components/PostCard';
import { ArrowLeft, Send } from 'lucide-react';

const MOCK_DETAIL_POST = {
  id: 'post-1',
  user: {
    name: 'Alexander Wright',
    username: 'alexwright',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  content:
    'Just finished building the new dark mode UI for Sociality! Excited to share the progress with everyone. What do you all think about the design system?',
  imageUrl:
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  likesCount: 124,
  commentsCount: 2,
  createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  isLiked: true,
};

const INITIAL_COMMENTS = [
  {
    id: 'c1',
    user: 'Sophia Chen',
    username: 'sophiac',
    text: 'The dark mode theme looks super clean! 🔥',
    createdAt: '20m ago',
  },
  {
    id: 'c2',
    user: 'Daniel Martin',
    username: 'danmartin',
    text: 'Awesome work! Love the font and color palette.',
    createdAt: '10m ago',
  },
];

export default function PostDetailPage() {
  const router = useRouter();
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        id: `c-${Date.now()}`,
        user: 'You',
        username: 'currentuser',
        text: newComment,
        createdAt: 'Just now',
      },
    ]);
    setNewComment('');
  };

  return (
    <div className='min-h-screen bg-[#0d0e12] pb-20 sm:pb-8'>
      <Header />

      <main className='max-w-xl mx-auto px-4 pt-6 space-y-4'>
        <button
          onClick={() => router.back()}
          className='flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-2'
        >
          <ArrowLeft size={16} />
          <span>Back to feed</span>
        </button>

        {/* Target Post */}
        <PostCard {...MOCK_DETAIL_POST} />

        {/* Comment Input Box */}
        <form onSubmit={handleAddComment} className='flex gap-2'>
          <input
            type='text'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Write a comment...'
            className='flex-1 px-4 py-3 bg-[#16181e] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500'
          />
          <button
            type='submit'
            disabled={!newComment.trim()}
            className='px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 text-white rounded-xl transition-colors'
          >
            <Send size={18} />
          </button>
        </form>

        {/* Comments Section */}
        <div className='bg-[#12141a] border border-gray-800/80 rounded-2xl p-4 space-y-4'>
          <h3 className='text-sm font-semibold text-white'>
            Comments ({comments.length})
          </h3>

          <div className='space-y-3 divide-y divide-gray-800/40'>
            {comments.map((comment) => (
              <div key={comment.id} className='pt-3 first:pt-0 space-y-1'>
                <div className='flex justify-between items-center text-xs'>
                  <span className='font-semibold text-white'>
                    {comment.user}
                  </span>
                  <span className='text-gray-500'>{comment.createdAt}</span>
                </div>
                <p className='text-sm text-gray-300'>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
