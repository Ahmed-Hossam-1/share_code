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

export const getCurrentUser = async (id: string) => {
  const data = await axiosInstance.get<User>(`/api/auth/user/${id}`);
  return data.data;
};

// auth
export const signupUser = async (userData: User) => {
  const data = await axiosInstance.post<SignUpResponse>('/api/auth/signup', userData);
  Cookies.set('jwt', data.data.jwt ?? '', { expires: 7 });
  Cookies.set('userId', data.data.user.id ?? '', { expires: 7 });
  return data.data;
};

export const signinUser = async (userData: SignInRequest) => {
  const data = await axiosInstance.post<SignInResponse>('/api/auth/signin', userData);
  Cookies.set('jwt', data.data.jwt ?? '', { expires: 7 });
  Cookies.set('userId', data.data.user.id ?? '', { expires: 7 });
  return data.data;
};

export const logout = () => {
  Cookies.remove('jwt');
  Cookies.remove('userId');
};
