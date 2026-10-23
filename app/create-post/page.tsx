'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();

  // State Profile Logged-in User (Hastie Koe & avatar /post.png)
  const [currentUser, setCurrentUser] = useState({
    name: 'Hastie Koe',
    username: 'hastiekoe',
    avatar: '/post.png',
  });

  // State Form Upload
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load Profil dari localStorage untuk Header Kanan Atas
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setCurrentUser({
          name: parsed.name || 'Hastie Koe',
          username: parsed.username || 'hastiekoe',
          avatar: parsed.avatar || '/post.png',
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Handle Upload Image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // Handle Submit Share Post
  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview && !caption) {
      alert('Silakan pilih foto atau isi caption terlebih dahulu.');
      return;
    }

    // Arahkan kembali ke Feed setelah posting
    router.push('/feed');
  };

  return (
    <div className='min-h-screen bg-[#030206] text-white flex flex-col items-center pb-24'>
      {/* NAVBAR / HEADER */}
      <header className='sticky top-0 z-40 w-full bg-[#030206]/90 backdrop-blur-md border-b border-gray-900 px-4 py-3 flex items-center justify-between max-w-5xl'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <Link href='/feed' className='flex items-center gap-2'>
            <img
              src='/logo.png'
              alt='Sociality'
              className='h-6 w-auto object-contain'
            />
          </Link>
        </div>

        {/* Search Bar Desktop */}
        <div className='hidden md:block w-72'>
          <div className='flex items-center w-full bg-[#121318] border border-gray-800 rounded-full px-3 py-1.5'>
            <span className='text-gray-400 text-xs mr-2'>🔍</span>
            <input
              type='text'
              placeholder='Search'
              className='w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none'
              readOnly
            />
          </div>
        </div>

        {/* Profile Nav Right (YANG DILINGKARI: HASTIE KOE & /post.png) */}
        <Link
          href='/profile'
          className='flex items-center gap-2 group cursor-pointer'
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className='w-8 h-8 rounded-full object-cover border border-purple-500/80 group-hover:scale-105 transition'
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/post.png';
            }}
          />
          <span className='hidden sm:inline text-xs font-semibold text-white group-hover:text-purple-400 transition'>
            {currentUser.name}
          </span>
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main className='w-full max-w-lg px-4 pt-8'>
        <form onSubmit={handleShare} className='space-y-6'>
          {/* Back & Title Header */}
          <div className='flex items-center gap-3'>
            <Link
              href='/feed'
              className='text-gray-400 hover:text-white transition text-lg'
            >
              ←
            </Link>
            <h1 className='text-lg font-bold text-white'>Add Post</h1>
          </div>

          {/* Upload Photo Area */}
          <div className='space-y-2'>
            <label className='text-xs font-semibold text-gray-300'>Photo</label>
            <div className='relative border-2 border-dashed border-gray-800 rounded-2xl p-6 bg-[#0c0d12] hover:border-gray-700 transition flex flex-col items-center justify-center min-h-[180px] cursor-pointer group'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
              />

              {imagePreview ? (
                <div className='relative w-full aspect-square rounded-xl overflow-hidden'>
                  <img
                    src={imagePreview}
                    alt='Upload Preview'
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-semibold transition'>
                    Click or Drag to Change Image
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center space-y-2 text-center'>
                  <div className='w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-purple-400'>
                    ☁️
                  </div>
                  <p className='text-xs font-semibold text-gray-200'>
                    <span className='text-purple-400'>Click to upload</span> or
                    drag and drop
                  </p>
                  <p className='text-[10px] text-gray-500'>
                    PNG or JPG (max. 5mb)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Caption Area */}
          <div className='space-y-2'>
            <label className='text-xs font-semibold text-gray-300'>
              Caption
            </label>
            <textarea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder='Create your caption'
              className='w-full bg-[#0c0d12] border border-gray-800 rounded-2xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none'
            />
          </div>

          {/* Share Button */}
          <button
            type='submit'
            className='w-full py-3 bg-[#7c3aed] hover:bg-[#6d28d9] rounded-full text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition active:scale-95'
          >
            Share
          </button>
        </form>
      </main>

      {/* BOTTOM NAVIGATION BAR MOBILE */}
      <nav className='md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#0c0d12]/90 border border-gray-800 backdrop-blur-xl px-6 py-2 rounded-full flex items-center gap-8 shadow-2xl z-40'>
        <Link
          href='/feed'
          className='flex flex-col items-center text-gray-400 hover:text-white text-xs font-medium'
        >
          <span className='text-base'>🏠</span>
          <span>Home</span>
        </Link>
        <Link
          href='/create-post'
          className='w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold shadow-lg shadow-purple-600/40 text-lg hover:bg-[#6d28d9] transition'
        >
          +
        </Link>
        <Link
          href='/profile'
          className='flex flex-col items-center text-gray-400 hover:text-white text-xs font-medium'
        >
          <span className='text-base'>👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
