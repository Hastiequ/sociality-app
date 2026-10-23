'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Errors State
  const [errors, setErrors] = useState<{
    name?: string;
    username?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = 'Text Helper';
    if (!username.trim()) newErrors.username = 'Text Helper';
    if (!phone.trim()) newErrors.phone = 'Text Helper';
    if (!password.trim()) newErrors.password = 'Text Helper';
    if (!confirmPassword.trim() || confirmPassword !== password) {
      newErrors.confirmPassword = 'Text Helper';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 500);
  };

  return (
    <div className='min-h-screen w-full bg-[#030206] flex items-center justify-center p-4 relative overflow-hidden my-auto'>
      {/* Ambient Purple Background Glow */}
      <div className='absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#5b21b6]/40 via-[#3b0764]/20 to-transparent pointer-events-none blur-3xl' />

      {/* Register Card */}
      <div className='w-full max-w-sm bg-[#090a0f]/90 border border-gray-800/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl z-10'>
        {/* Logo & Title */}
        <div className='flex flex-col items-center text-center space-y-2'>
          <img
            src='/logo.png'
            alt='Sociality'
            className='h-8 w-auto object-contain mb-1'
          />
          <h1 className='text-lg font-bold text-white tracking-wide'>
            Register
          </h1>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className='space-y-3.5'>
          {/* Name Field (Sesuai Figma: Enter your email) */}
          <div className='space-y-1'>
            <label className='block text-xs font-semibold text-white'>
              Name
            </label>
            <input
              type='text'
              placeholder='Enter your email'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-[#121318] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition ${
                errors.name
                  ? 'border-pink-600/80 focus:border-pink-600'
                  : 'border-gray-800 focus:border-[#7c3aed]'
              }`}
            />
            {errors.name && (
              <p className='text-[11px] text-pink-500 font-medium pt-0.5'>
                {errors.name}
              </p>
            )}
          </div>

          {/* Username Field */}
          <div className='space-y-1'>
            <label className='block text-xs font-semibold text-white'>
              Username
            </label>
            <input
              type='text'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full bg-[#121318] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition ${
                errors.username
                  ? 'border-pink-600/80 focus:border-pink-600'
                  : 'border-gray-800 focus:border-[#7c3aed]'
              }`}
            />
            {errors.username && (
              <p className='text-[11px] text-pink-500 font-medium pt-0.5'>
                {errors.username}
              </p>
            )}
          </div>

          {/* Number Phone Field */}
          <div className='space-y-1'>
            <label className='block text-xs font-semibold text-white'>
              Number Phone
            </label>
            <input
              type='text'
              placeholder='Enter your number phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full bg-[#121318] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition ${
                errors.phone
                  ? 'border-pink-600/80 focus:border-pink-600'
                  : 'border-gray-800 focus:border-[#7c3aed]'
              }`}
            />
            {errors.phone && (
              <p className='text-[11px] text-pink-500 font-medium pt-0.5'>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className='space-y-1'>
            <label className='block text-xs font-semibold text-white'>
              Password
            </label>
            <div className='relative flex items-center'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-[#121318] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none pr-10 transition ${
                  errors.password
                    ? 'border-pink-600/80 focus:border-pink-600'
                    : 'border-gray-800 focus:border-[#7c3aed]'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 p-1 rounded-full text-gray-400 hover:text-white transition'
              >
                <svg
                  className='w-4 h-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                  <circle cx='12' cy='12' r='3'></circle>
                </svg>
              </button>
            </div>
            {errors.password && (
              <p className='text-[11px] text-pink-500 font-medium pt-0.5'>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className='space-y-1'>
            <label className='block text-xs font-semibold text-white'>
              Confirm Password
            </label>
            <div className='relative flex items-center'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Enter your confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-[#121318] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none pr-10 transition ${
                  errors.confirmPassword
                    ? 'border-pink-600/80 focus:border-pink-600'
                    : 'border-gray-800 focus:border-[#7c3aed]'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 p-1 rounded-full text-gray-400 hover:text-white transition'
              >
                <svg
                  className='w-4 h-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                  <circle cx='12' cy='12' r='3'></circle>
                </svg>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-[11px] text-pink-500 font-medium pt-0.5'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className='pt-2'>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 transition active:scale-98'
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Switch Link */}
        <div className='text-center text-xs text-gray-300'>
          <span>Already have an account? </span>
          <Link
            href='/login'
            className='text-[#8b5cf6] font-bold hover:underline ml-1'
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
