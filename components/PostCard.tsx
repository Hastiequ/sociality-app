'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface PostCardProps {
  id: string;
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export default function PostCard({
  id,
  user,
  content,
  imageUrl,
  likesCount,
  commentsCount,
  createdAt,
  isLiked = false,
  isSaved = false,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);
  const [saved, setSaved] = useState(isSaved);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  // Batasi panjang caption jika belum diklik "Show more"
  const isLongContent = content.length > 150;
  const displayedContent =
    isLongContent && !showFullContent ? content.slice(0, 150) + '...' : content;

  return (
    <article className='bg-[#12141a] border border-gray-800/80 rounded-2xl overflow-hidden shadow-sm mb-4'>
      {/* Post Header */}
      <div className='flex items-center justify-between p-4 pb-3'>
        <Link
          href={`/profile/${user.username}`}
          className='flex items-center gap-3 group'
        >
          <div className='w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex items-center justify-center font-bold text-gray-300'>
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={40}
                height={40}
                className='object-cover w-full h-full'
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h4 className='font-semibold text-sm text-white group-hover:text-indigo-400 transition-colors'>
              {user.name}
            </h4>
            <p className='text-xs text-gray-400'>
              @{user.username} •{' '}
              <span title={createdAt}>{dayjs(createdAt).fromNow()}</span>
            </p>
          </div>
        </Link>
      </div>

      {/* Post Content */}
      <div className='px-4 pb-3'>
        <p className='text-sm text-gray-200 whitespace-pre-line leading-relaxed'>
          {displayedContent}
        </p>
        {isLongContent && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className='text-xs font-medium text-indigo-400 hover:underline mt-1'
          >
            {showFullContent ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Post Image (jika ada) */}
      {imageUrl && (
        <div className='relative w-full aspect-square sm:aspect-video bg-gray-900 border-y border-gray-800/60'>
          <Image
            src={imageUrl}
            alt='Post media'
            fill
            className='object-cover'
          />
        </div>
      )}

      {/* Post Actions (Like, Comment, Share, Bookmark) */}
      <div className='px-4 py-3 flex items-center justify-between border-t border-gray-800/40'>
        <div className='flex items-center gap-5'>
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
              liked ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'
            }`}
          >
            <Heart size={18} className={liked ? 'fill-rose-500' : ''} />
            <span>{likes}</span>
          </button>

          {/* Comment Button */}
          <Link
            href={`/posts/${id}`}
            className='flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-indigo-400 transition-colors'
          >
            <MessageCircle size={18} />
            <span>{commentsCount}</span>
          </Link>

          {/* Share Button */}
          <button className='text-gray-400 hover:text-gray-200 transition-colors'>
            <Share2 size={18} />
          </button>
        </div>

        {/* Bookmark / Save Button */}
        <button
          onClick={handleSave}
          className={`transition-colors ${
            saved ? 'text-indigo-500' : 'text-gray-400 hover:text-indigo-400'
          }`}
        >
          <Bookmark size={18} className={saved ? 'fill-indigo-500' : ''} />
        </button>
      </div>
    </article>
  );
}
