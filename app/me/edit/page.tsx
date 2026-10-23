'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Camera } from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState('Alexander Wright');
  const [username, setUsername] = useState('alexwright');
  const [bio, setBio] = useState(
    'Full-stack Developer & UI/UX enthusiast. Building modern web experiences with React & Next.js.'
  );
  const [location, setLocation] = useState('Jakarta, Indonesia');
  const [website, setWebsite] = useState('https://alexwright.dev');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push('/me');
    }, 800);
  };

  return (
    <div className='min-h-screen bg-[#0d0e12] pb-20 sm:pb-8'>
      <Header />

      <main className='max-w-md mx-auto px-4 pt-6 space-y-6'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => router.back()}
            className='p-2 text-gray-400 hover:text-white bg-[#12141a] border border-gray-800 rounded-xl'
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className='text-xl font-bold text-white'>Edit Profile</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-[#12141a] border border-gray-800/80 rounded-2xl p-6 space-y-4'
        >
          {/* Avatar Upload Preview */}
          <div className='flex flex-col items-center gap-3'>
            <div className='relative w-24 h-24 rounded-full bg-gray-800 border-2 border-indigo-500 overflow-hidden group cursor-pointer'>
              <img
                src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                alt='Avatar'
                className='w-full h-full object-cover group-hover:opacity-60 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity'>
                <Camera size={24} />
              </div>
            </div>
            <span className='text-xs text-indigo-400 font-medium'>
              Change Photo
            </span>
          </div>

          <div className='space-y-1.5'>
            <label className='text-xs font-medium text-gray-300'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2.5 bg-[#16181e] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500'
            />
          </div>

          <div className='space-y-1.5'>
            <label className='text-xs font-medium text-gray-300'>
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2.5 bg-[#16181e] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500'
            />
          </div>

          <div className='space-y-1.5'>
            <label className='text-xs font-medium text-gray-300'>Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className='w-full px-4 py-2.5 bg-[#16181e] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 resize-none'
            />
          </div>

          <div className='space-y-1.5'>
            <label className='text-xs font-medium text-gray-300'>
              Location
            </label>
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='w-full px-4 py-2.5 bg-[#16181e] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500'
            />
          </div>

          <div className='space-y-1.5'>
            <label className='text-xs font-medium text-gray-300'>Website</label>
            <input
              type='url'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className='w-full px-4 py-2.5 bg-[#16181e] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500'
            />
          </div>

          <button
            type='submit'
            disabled={isSaving}
            className='w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition-colors shadow-md shadow-indigo-600/20 mt-2'
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}
