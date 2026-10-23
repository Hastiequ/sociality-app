'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Hastie Koe',
    username: 'hastiekoe',
    avatar: '/post.png',
  });

  useEffect(() => {
    setIsMounted(true);
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setUserProfile({
          name: parsed.name || 'Hastie Koe',
          username: parsed.username || 'hastiekoe',
          avatar: '/post.png',
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      if (query.includes('johndoe') || query === 'john doe') {
        router.push('/profile/johndoe');
      } else {
        router.push(`/feed?search=${encodeURIComponent(query)}`);
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div className='min-h-screen bg-[#030206] text-white flex flex-col items-center pb-24 relative'>
      {/* Header Navbar */}
      <header className='sticky top-0 z-40 w-full bg-[#030206]/90 backdrop-blur-md border-b border-gray-900 px-4 py-3 flex items-center justify-between max-w-5xl'>
        <Link href='/feed' className='flex items-center gap-2'>
          <img
            src='/logo.png'
            alt='Sociality'
            className='h-6 w-auto object-contain'
          />
        </Link>
        <div className='relative w-64 md:w-80'>
          <div className='flex items-center w-full bg-[#0b0c10] border border-gray-800 rounded-full px-3.5 py-1.5'>
            <span className='text-gray-400 text-xs mr-2'>🔍</span>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder='Search'
              className='w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none'
            />
          </div>
        </div>
        <Link href='/profile' className='flex items-center gap-2 group'>
          <img
            src='/post.png'
            alt={userProfile.name}
            className='w-8 h-8 rounded-full object-cover border border-purple-500/80'
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/post.png';
            }}
          />
          <span className='hidden sm:inline text-xs font-semibold text-white group-hover:text-purple-400 transition'>
            {userProfile.name}
          </span>
        </Link>
      </header>

      {/* Main Profile Info */}
      <main className='w-full max-w-4xl px-4 pt-8 space-y-8'>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-900 pb-8'>
          <div className='w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-purple-500/80 bg-gray-900 flex-shrink-0'>
            <img
              src='/post.png'
              alt={userProfile.name}
              className='w-full h-full object-cover'
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/post.png';
              }}
            />
          </div>
          <div className='flex-1 space-y-3 text-center md:text-left'>
            <div className='flex flex-col md:flex-row md:items-center gap-4'>
              <h2 className='text-xl font-bold text-white'>
                {userProfile.name}
              </h2>
              <Link
                href='/edit-profile'
                className='px-4 py-1.5 bg-[#121318] border border-gray-800 hover:border-gray-700 text-xs font-semibold rounded-full transition text-center'
              >
                Edit Profile
              </Link>
            </div>
            <p className='text-xs text-gray-400'>@{userProfile.username}</p>
            <p className='text-xs text-gray-300 max-w-md'>
              Creating unforgettable moments with my favorite person! 📸✨ Let's
              cherish every second together!
            </p>
            <div className='flex justify-center md:justify-start gap-8 pt-2 text-xs font-semibold'>
              <div className='text-center md:text-left'>
                <span className='block text-sm font-bold text-white'>50</span>
                <span className='text-gray-400 text-[11px]'>Post</span>
              </div>
              <div className='text-center md:text-left'>
                <span className='block text-sm font-bold text-white'>100</span>
                <span className='text-gray-400 text-[11px]'>Followers</span>
              </div>
              <div className='text-center md:text-left'>
                <span className='block text-sm font-bold text-white'>43</span>
                <span className='text-gray-400 text-[11px]'>Following</span>
              </div>
              <div className='text-center md:text-left'>
                <span className='block text-sm font-bold text-white'>567</span>
                <span className='text-gray-400 text-[11px]'>Likes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Tabs */}
        <div className='flex justify-center gap-8 border-b border-gray-900 text-xs font-semibold pb-2'>
          <button className='text-purple-400 border-b-2 border-purple-500 pb-2 -mb-2'>
            Gallery
          </button>
          <button className='text-gray-400 hover:text-white pb-2 -mb-2 transition'>
            Saved
          </button>
        </div>

        {/* Post Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {[
            '/post1.png',
            '/post2.png',
            '/post3.png',
            '/post4.png',
            '/post5.png',
            '/post6.png',
          ].map((img, idx) => (
            <div
              key={idx}
              className='aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-gray-800/80'
            >
              <img
                src={img}
                alt={`Post ${idx + 1}`}
                className='w-full h-full object-cover hover:scale-105 transition duration-300'
              />
            </div>
          ))}
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <nav className='fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c0d12]/90 border border-gray-800/80 backdrop-blur-2xl px-6 py-2.5 rounded-full flex items-center gap-8 shadow-2xl z-40'>
        <Link
          href='/feed'
          className='flex flex-col items-center text-gray-400 hover:text-white text-xs font-semibold transition'
        >
          <span className='text-base'>🏠</span>
          <span>Home</span>
        </Link>
        <Link
          href='/create-post'
          className='w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold shadow-lg shadow-purple-600/40 text-xl hover:bg-[#6d28d9] transition'
        >
          +
        </Link>
        <Link
          href='/profile'
          className='flex flex-col items-center text-[#8b5cf6] text-xs font-semibold'
        >
          <span className='text-base'>👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
