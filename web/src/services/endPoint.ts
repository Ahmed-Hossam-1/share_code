import axios from 'axios';
import { ListPostResponse } from '../types/api';
// import { Post } from '../types/types';

const BASE_URL = 'http://localhost:3000';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getPosts = async () => {
  const data = await axiosInstance.get<ListPostResponse>('/api/posts');
  return data.data;
};
