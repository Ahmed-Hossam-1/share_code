/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {
  ListCommentsResponse,
  ListPostResponse,
  SignInRequest,
  SignInResponse,
  SignUpResponse,
} from '../types/api';
import { Post, TNewPost, User } from '../types/types';
import Cookies from 'js-cookie';
// import { Post } from '../types/types';

const BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({ baseURL: BASE_URL });

// posts
export const createPosts = async (postData: TNewPost) => {
  console.log(postData);
  const data = await axiosInstance.post<TNewPost>('/api/posts', postData, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('jwt'),
      Accept: 'application/json',
    },
  });
  return data.data;
};

export const getPosts = async ({ pageParam = 1, pageSize = 8 }) => {
  const data = await axiosInstance.get<ListPostResponse>('/api/posts', {
    params: {
      page: pageParam,
      pageSize,
    },
    headers: {
      Authorization: 'Bearer ' + Cookies.get('jwt'),
      Accept: 'application/json',
    },
  });
  return data.data;
};

// export const getPosts = async () => {
//   const data = await axiosInstance.get<ListPostResponse>('/api/posts', {
//     headers: {
//       Authorization: 'Bearer ' + Cookies.get('jwt'),
//       Accept: 'application/json',
//     },
//   });
//   return data.data;
// };

export const getSinglePost = async (postId: string) => {
  const data = await axiosInstance.get<{ post: Post }>(`/api/posts/${postId}`, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('jwt'),
      Accept: 'application/json',
    },
  });
  return data.data;
};

// users
export const getUser = async (id: string | undefined) => {
  const data = await axiosInstance.get<User>(`/api/auth/user/${id}`);
  return data.data;
};

export const getCurrentUser = async () => {
  const data = await axiosInstance.get<User>(`/api/auth/user`, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('jwt'),
      Accept: 'application/json',
    },
  });
  return data.data;
};

// auth
export const signupUser = async (userData: User) => {
  const data = await axiosInstance.post<SignUpResponse>('/api/auth/signup', userData);
  Cookies.set('jwt', data.data.jwt ?? '');
  return data.data;
};

export const signinUser = async (userData: SignInRequest) => {
  const data = await axiosInstance.post<SignInResponse>('/api/auth/signin', userData);
  Cookies.set('jwt', data.data.jwt ?? '');
  return data.data;
};

export const logout = () => {
  Cookies.remove('jwt');
};

export const getJWT = (): string => {
  return Cookies.get('jwt') || '';
};

export const isLoggedIn = (): boolean => {
  const jwt = getJWT();
  return !!jwt;
};

// comments
export const countComments = async (id: string) => {
  const data = await axiosInstance.get<{ count: number }>(`/api/comments/${id}/count`);
  return data.data;
};

export const getComments = async (postId: string | undefined) => {
  const data = await axiosInstance.get<ListCommentsResponse>(`/api/comments/${postId}`);
  return data.data;
};

interface TcommentData {
  postId: string | undefined;
  comment: string;
}

export const createComment = async (commentData: TcommentData) => {
  console.log(commentData, 'commentData');
  const data = await axiosInstance.post<Comment>(
    `/api/comments/${commentData.postId}`,
    { comment: commentData.comment },
    {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('jwt'),
        Accept: 'application/json',
      },
    }
  );
  return data.data;
};

// Likes
export const createLike = async (postId: string) => {
  const data = await axiosInstance.get(`/api/likes/${postId}`, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('jwt'),
      Accept: 'application/json',
    },
  });
  return data.data;
};

export const deleteLike = async (postId: string) => {
  const data = await axiosInstance.delete(`/api/likes/${postId}`, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('jwt'),
      Accept: 'application/json',
    },
  });
  return data.data;
};

export const countLike = async (postId: string) => {
  const data = await axiosInstance.get(`/api/likes/${postId}/count`);
  return data.data;
};
