import { api } from '@/lib/api';

// Types & Interfaces
export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  text: string;
  createdAt?: string;
  user?: User;
}

export interface Post {
  id: string;
  caption: string;
  imageUrl?: string;
  createdAt?: string;
  author?: User;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

// 1. Fetch Feed Posts
export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  const data = response.data?.data || response.data;
  return Array.isArray(data) ? data : [];
};

// 2. Like & Unlike Post
export const likePost = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data;
};

export const unlikePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}/like`);
  return response.data;
};

// 3. Save & Unsave Post
export const savePost = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/save`);
  return response.data;
};

export const unsavePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}/save`);
  return response.data;
};

// 4. Comments (Get & Create)
export const getComments = async (postId: string): Promise<Comment[]> => {
  const response = await api.get(`/posts/${postId}/comments`);
  const data = response.data?.data || response.data;
  return Array.isArray(data) ? data : [];
};

export const createComment = async (
  postId: string,
  text: string
): Promise<Comment> => {
  const response = await api.post(`/posts/${postId}/comments`, { text });
  return response.data?.data || response.data;
};

// 5. Get Post Likes
export const getPostLikes = async (postId: string): Promise<User[]> => {
  const response = await api.get(`/posts/${postId}/likes`);
  const data = response.data?.data || response.data;
  return Array.isArray(data) ? data : [];
};
