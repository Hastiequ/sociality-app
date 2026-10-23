'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className='sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-800/80 bg-[#0d0e12]/90 backdrop-blur-lg px-6 py-3'>
      <div className='flex items-center justify-around max-w-md mx-auto'>
        <Link
          href='/feed'
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive('/feed')
              ? 'text-indigo-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Home size={22} />
          <span className='text-[10px] font-medium'>Home</span>
        </Link>

        <Link
          href='/posts/create'
          className='flex flex-col items-center gap-1 text-indigo-500 hover:text-indigo-400 transition-colors'
        >
          <PlusCircle size={28} className='fill-indigo-600/20' />
          <span className='text-[10px] font-medium'>Post</span>
        </Link>

        <Link
          href='/me'
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive('/me')
              ? 'text-indigo-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <User size={22} />
          <span className='text-[10px] font-medium'>Profile</span>
        </Link>
      </div>
    </nav>
  );
}
