'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, PlusSquare, User, LogOut } from 'lucide-react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className='sticky top-0 z-40 w-full border-b border-gray-800/60 bg-[#0d0e12]/80 backdrop-blur-md'>
      <div className='max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4'>
        {/* Brand Logo */}
        <Link href='/feed' className='flex items-center gap-2'>
          <div className='w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30'>
            S
          </div>
          <span className='font-bold text-lg tracking-tight text-white hidden sm:inline-block'>
            Sociality
          </span>
        </Link>

        {/* Search Bar */}
        <div className='flex-1 max-w-sm relative'>
          <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search users...'
            className='w-full pl-10 pr-4 py-2 bg-[#16181e] border border-gray-800 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors'
          />
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-3'>
          {isLoggedIn ? (
            <>
              <Link
                href='/posts/create'
                className='hidden sm:flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-600/20'
              >
                <PlusSquare size={18} />
                <span>Create</span>
              </Link>
              <Link
                href='/me'
                className='w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:border-indigo-500 transition-colors overflow-hidden'
              >
                <User size={18} className='text-gray-300' />
              </Link>
              <button
                onClick={handleLogout}
                className='text-gray-400 hover:text-red-400 p-2 transition-colors'
                title='Logout'
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div className='flex items-center gap-2'>
              <Link
                href='/login'
                className='px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors shadow-sm shadow-indigo-600/20'
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
