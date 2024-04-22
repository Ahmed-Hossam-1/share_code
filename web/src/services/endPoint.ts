/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { ListPostResponse, SignInRequest, SignInResponse, SignUpResponse } from '../types/api';
import { User } from '../types/types';
// import { Post } from '../types/types';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3000';
const axiosInstance = axios.create({ baseURL: BASE_URL });
export const getPosts = async () => {
  const data = await axiosInstance.get<ListPostResponse>('/api/posts');
  return data.data;
};

export const getUser = async (id: string) => {
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

export const countComments = async (id: string) => {
  const data = await axiosInstance.get<{ count: number }>(`/api/comments/${id}/count`);
  return data.data;
};

// LIKES
export const createLike = async (postId: string) => {
  console.log(Cookies.get('jwt'), 'jdiffffffffffff', postId);
  const data = await axiosInstance.get(`/api/likes/${postId}`, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('jwt'),
      Accept: 'application/json',
    },
  });
  return data.data;
};

export const deleteLike = async (postId: string) => {
  const data = await axiosInstance.delete(`/api/likes/${postId}`);
  return data.data;
};
