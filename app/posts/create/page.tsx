'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/feed');
    }, 800);
  };

  return (
    <div className='min-h-screen bg-[#0d0e12] pb-20 sm:pb-8'>
      <Header />

      <main className='max-w-xl mx-auto px-4 pt-6 space-y-6'>
        <div className='flex items-center justify-between'>
          <button
            onClick={() => router.back()}
            className='p-2 text-gray-400 hover:text-white bg-[#12141a] border border-gray-800 rounded-xl'
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className='text-xl font-bold text-white'>Create Post</h1>
          <div className='w-9' />
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-[#12141a] border border-gray-800/80 rounded-2xl p-6 space-y-4'
        >
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening on your mind?"
            className='w-full bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none text-base leading-relaxed'
          />

          {imagePreview && (
            <div className='relative w-full aspect-video rounded-xl overflow-hidden border border-gray-800'>
              <img
                src={imagePreview}
                alt='Preview'
                className='w-full h-full object-cover'
              />
              <button
                type='button'
                onClick={() => setImagePreview(null)}
                className='absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-black'
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className='flex items-center justify-between pt-4 border-t border-gray-800/60'>
            <label className='flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm cursor-pointer'>
              <ImageIcon size={20} />
              <span className='font-medium'>Add Photo</span>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </label>

            <button
              type='submit'
              disabled={!content.trim() || isSubmitting}
              className='px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/50 text-white font-medium text-sm rounded-xl transition-colors shadow-md shadow-indigo-600/20'
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}
