import { useQuery } from '@tanstack/react-query';
import { getPosts } from './endPoint';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};
