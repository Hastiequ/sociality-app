'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PostCard from '@/components/PostCard';
import { Edit3, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';

const MOCK_USER = {
  name: 'Alexander Wright',
  username: 'alexwright',
  bio: 'Full-stack Developer & UI/UX enthusiast. Building modern web experiences with React & Next.js.',
  location: 'Jakarta, Indonesia',
  website: 'https://alexwright.dev',
  joinedDate: 'January 2024',
  avatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  postsCount: 12,
  followersCount: 1420,
  followingCount: 380,
};

const MOCK_MY_POSTS = [
  {
    id: 'post-1',
    user: {
      name: MOCK_USER.name,
      username: MOCK_USER.username,
      avatar: MOCK_USER.avatar,
    },
    content:
      'Just finished building the new dark mode UI for Sociality! Excited to share the progress with everyone. What do you all think about the design system?',
    imageUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    likesCount: 124,
    commentsCount: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    isLiked: true,
  },
];

export default function MyProfilePage() {
  return (
    <div className='min-h-screen bg-[#0d0e12] pb-20 sm:pb-8'>
      <Header />

      <main className='max-w-xl mx-auto px-4 pt-6 space-y-6'>
        {/* Profile Card Header */}
        <div className='bg-[#12141a] border border-gray-800/80 rounded-2xl p-6 space-y-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div className='w-20 h-20 rounded-full bg-gray-800 border-2 border-indigo-500 overflow-hidden relative'>
                <Image
                  src={MOCK_USER.avatar}
                  alt={MOCK_USER.name}
                  fill
                  className='object-cover'
                />
              </div>
              <div>
                <h1 className='text-xl font-bold text-white'>
                  {MOCK_USER.name}
                </h1>
                <p className='text-sm text-gray-400'>@{MOCK_USER.username}</p>
              </div>
            </div>

            <Link
              href='/me/edit'
              className='flex items-center gap-2 px-3.5 py-2 bg-[#16181e] border border-gray-700 hover:border-indigo-500 text-xs font-medium text-white rounded-xl transition-colors'
            >
              <Edit3 size={14} />
              <span>Edit Profile</span>
            </Link>
          </div>

          <p className='text-sm text-gray-200 leading-relaxed'>
            {MOCK_USER.bio}
          </p>

          <div className='flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-400'>
            <div className='flex items-center gap-1'>
              <MapPin size={14} />
              <span>{MOCK_USER.location}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LinkIcon size={14} />
              <a
                href={MOCK_USER.website}
                target='_blank'
                rel='noreferrer'
                className='text-indigo-400 hover:underline'
              >
                {MOCK_USER.website.replace('https://', '')}
              </a>
            </div>
            <div className='flex items-center gap-1'>
              <Calendar size={14} />
              <span>Joined {MOCK_USER.joinedDate}</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className='flex items-center justify-around pt-4 border-t border-gray-800/60 text-center'>
            <div>
              <p className='text-base font-bold text-white'>
                {MOCK_USER.postsCount}
              </p>
              <p className='text-xs text-gray-400'>Posts</p>
            </div>
            <div>
              <p className='text-base font-bold text-white'>
                {MOCK_USER.followersCount}
              </p>
              <p className='text-xs text-gray-400'>Followers</p>
            </div>
            <div>
              <p className='text-base font-bold text-white'>
                {MOCK_USER.followingCount}
              </p>
              <p className='text-xs text-gray-400'>Following</p>
            </div>
          </div>
        </div>

        {/* User Posts Stream */}
        <div className='space-y-4'>
          <h2 className='text-base font-semibold text-white px-1'>
            Your Posts
          </h2>
          {MOCK_MY_POSTS.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
