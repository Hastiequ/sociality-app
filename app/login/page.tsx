'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password harus diisi.');
      return;
    }

    // Simpan token/status login & profil default
    localStorage.setItem('user_token', 'mock_token_123');
    localStorage.setItem(
      'user_profile',
      JSON.stringify({
        name: 'Hastie Koe',
        username: 'hastiekoe',
        email: email,
      })
    );

    router.push('/feed');
  };

  return (
    <div className='min-h-screen bg-[#030206] text-white flex items-center justify-center relative overflow-hidden px-4'>
      {/* Efek Glow Ungu di Background Bawah */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/30 blur-[120px] pointer-events-none rounded-full' />

      {/* Card Login */}
      <div className='w-full max-w-md bg-[#08090d] border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative z-10 flex flex-col items-center'>
        {/* Logo & Brand */}
        <div className='flex items-center gap-2 mb-2'>
          <img
            src='/logo.png'
            alt='Sociality Logo'
            className='h-7 w-auto object-contain'
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/post.png';
            }}
          />
          <span className='text-xl font-bold tracking-tight text-white'>
            Sociality
          </span>
        </div>

        {/* Welcome Text */}
        <h2 className='text-xl font-bold text-white mb-6 tracking-wide'>
          Welcome Back!
        </h2>

        {error && (
          <div className='w-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs py-2 px-3 rounded-xl mb-4 text-center'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className='w-full space-y-4'>
          {/* Email Field */}
          <div className='space-y-1.5'>
            <label className='block text-xs font-semibold text-gray-200'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full bg-[#0c0d12] border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition'
            />
          </div>

          {/* Password Field */}
          <div className='space-y-1.5'>
            <label className='block text-xs font-semibold text-gray-200'>
              Password
            </label>
            <div className='relative flex items-center'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='w-full bg-[#0c0d12] border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 text-gray-400 hover:text-white transition text-sm'
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type='submit'
            className='w-full py-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-xs font-bold text-white rounded-xl transition shadow-lg shadow-purple-600/30 mt-2'
          >
            Login
          </button>
        </form>

        {/* Footer Register Link */}
        <p className='text-xs text-gray-400 mt-6'>
          Don't have an account?{' '}
          <Link
            href='/register'
            className='text-purple-400 font-semibold hover:underline'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
