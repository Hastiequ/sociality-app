'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

interface UserProfile {
  id: number;
  name: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  isFollowedByMe?: boolean;
  isMe?: boolean;
  _count?: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface Post {
  id: number;
  caption: string;
  imageUrl: string;
  createdAt: string;
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'likes'>('posts');
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const profileRes = await api.get(`/users/${username}`);
      if (profileRes.data.success) {
        setProfile(profileRes.data.data);
      }

      const postsRes = await api.get(
        `/users/${username}/posts?page=1&limit=20`
      );
      const postsData = Array.isArray(postsRes.data)
        ? postsRes.data
        : postsRes.data?.data?.posts || postsRes.data?.data || [];

      setPosts(postsData);
    } catch (err) {
      console.error('Gagal memuat profil user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFollow = async () => {
    if (!profile) return;
    try {
      setFollowLoading(true);
      if (profile.isFollowedByMe) {
        await api.delete(`/follow/${username}`);
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                isFollowedByMe: false,
                _count: {
                  ...prev._count,
                  posts: prev._count?.posts || 0,
                  following: prev._count?.following || 0,
                  followers: Math.max(0, (prev._count?.followers || 0) - 1),
                },
              }
            : null
        );
      } else {
        await api.post(`/follow/${username}`);
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                isFollowedByMe: true,
                _count: {
                  ...prev._count,
                  posts: prev._count?.posts || 0,
                  following: prev._count?.following || 0,
                  followers: (prev._count?.followers || 0) + 1,
                },
              }
            : null
        );
      }
    } catch (err) {
      console.error('Gagal mengubah status follow:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  if (loading && !profile) {
    return (
      <div className='flex justify-center items-center min-h-screen text-white'>
        Memuat profil...
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto py-8 px-4 space-y-6 text-white'>
      {/* Header Profil */}
      <div className='bg-[#16181d] border border-gray-800 rounded-xl p-6'>
        <div className='flex items-start justify-between gap-5'>
          <div className='flex items-center gap-5'>
            <div className='w-20 h-20 rounded-full bg-gray-700 overflow-hidden flex-shrink-0'>
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center font-bold text-2xl'>
                  {profile?.name?.[0] || 'U'}
                </div>
              )}
            </div>
            <div>
              <h2 className='text-xl font-bold'>{profile?.name}</h2>
              <p className='text-sm text-gray-400'>@{profile?.username}</p>
              {profile?.bio && <p className='text-sm mt-2'>{profile.bio}</p>}
            </div>
          </div>

          {/* Tombol Follow / Unfollow */}
          {!profile?.isMe && (
            <button
              onClick={handleToggleFollow}
              disabled={followLoading}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50 ${
                profile?.isFollowedByMe
                  ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {profile?.isFollowedByMe ? 'Mengikuti' : 'Ikuti'}
            </button>
          )}
        </div>

        {/* Stats */}
        <div className='flex gap-6 mt-6 text-xs text-gray-300 border-t border-gray-800/60 pt-4'>
          <div>
            <span className='font-bold text-white'>
              {profile?._count?.posts || 0}
            </span>{' '}
            Postingan
          </div>
          <div>
            <span className='font-bold text-white'>
              {profile?._count?.followers || 0}
            </span>{' '}
            Pengikut
          </div>
          <div>
            <span className='font-bold text-white'>
              {profile?._count?.following || 0}
            </span>{' '}
            Mengikuti
          </div>
        </div>
      </div>

      {/* Grid Postingan */}
      <h3 className='font-semibold text-lg'>Postingan</h3>
      {posts.length === 0 ? (
        <p className='text-center text-gray-400 py-8'>Belum ada postingan.</p>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='bg-[#16181d] border border-gray-800 rounded-xl overflow-hidden'
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt='Post content'
                  className='w-full h-48 object-cover'
                />
              )}
              {post.caption && (
                <p className='p-3 text-xs text-gray-300 line-clamp-2'>
                  {post.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
