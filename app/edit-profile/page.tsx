'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [bio, setBio] = useState(
    "Creating unforgettable moments with my favorite person! 📸✨ Let's cherish every second together!"
  );
  const [avatar, setAvatar] = useState('/johndoe.png');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Load data profil tersimpan jika ada
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setName(parsed.name);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.bio) setBio(parsed.bio);
        if (parsed.avatar) setAvatar(parsed.avatar);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Simpan ke localStorage
    const updatedProfile = { name, username, bio, avatar };
    localStorage.setItem('user_profile', JSON.stringify(updatedProfile));

    // Tampilkan banner hijau "Success"
    setShowSuccessBanner(true);

    setTimeout(() => {
      setShowSuccessBanner(false);
      router.push('/profile');
    }, 1200);
  };

  return (
    <div className='min-h-screen bg-[#030206] text-white flex flex-col items-center justify-center p-4 relative'>
      {/* Banner Success Hijau */}
      {showSuccessBanner && (
        <div className='fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#10b981] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-xl animate-bounce flex items-center gap-2'>
          <span>✓</span>
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Edit Profile Card */}
      <div className='w-full max-w-sm bg-[#090a0f]/90 border border-gray-800/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative z-10'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <button
            onClick={() => router.back()}
            className='text-gray-400 hover:text-white transition text-xs font-semibold'
          >
            ← Back
          </button>
          <h1 className='text-sm font-bold text-white'>Edit Profile</h1>
          <div className='w-8' />
        </div>

        {/* Change Avatar */}
        <div className='flex flex-col items-center gap-3'>
          <div className='relative group cursor-pointer'>
            <img
              src={avatar}
              alt='Profile Avatar'
              className='w-20 h-20 rounded-full object-cover border-2 border-purple-500/50 shadow-lg'
            />
            <label
              htmlFor='avatar-upload'
              className='absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold text-white transition cursor-pointer'
            >
              Change
            </label>
            <input
              id='avatar-upload'
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              className='hidden'
            />
          </div>
          <p className='text-[11px] text-gray-400'>
            Click photo to change avatar
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSave} className='space-y-4'>
          {/* Name */}
          <div className='space-y-1.5'>
            <label className='block text-xs font-semibold text-white'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full bg-[#121318] border border-gray-800 focus:border-[#7c3aed] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition'
            />
          </div>

          {/* Username */}
          <div className='space-y-1.5'>
            <label className='block text-xs font-semibold text-white'>
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full bg-[#121318] border border-gray-800 focus:border-[#7c3aed] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition'
            />
          </div>

          {/* Bio */}
          <div className='space-y-1.5'>
            <label className='block text-xs font-semibold text-white'>
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className='w-full bg-[#121318] border border-gray-800 focus:border-[#7c3aed] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition resize-none'
            />
          </div>

          {/* Save Button */}
          <div className='pt-2'>
            <button
              type='submit'
              className='w-full py-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 transition active:scale-98'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
