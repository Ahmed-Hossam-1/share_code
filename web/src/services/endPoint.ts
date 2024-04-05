import axios from 'axios';
import { ListPostResponse, SignInRequest, SignInResponse } from '../types/api';
import { jwtType, User } from '../types/types';
// import { Post } from '../types/types';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3000';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getPosts = async () => {
  const data = await axiosInstance.get<ListPostResponse>('/api/posts');
  return data.data;
};

export const signupUser = async (userData: User) => {
  const data = await axiosInstance.post<jwtType>('api/auth/signup', userData);
  Cookies.set('jwt', data.data.jwt ?? '', { expires: 7 });
  return data.data;
};

export const signinUser = async (userData: SignInRequest) => {
  const data = await axiosInstance.post<SignInResponse>('api/auth/signin', userData);
  Cookies.set('jwt', data.data.jwt ?? '', { expires: 7 });
  return data.data;
};
