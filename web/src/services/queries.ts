import { useQuery } from '@tanstack/react-query';
import { countLike, getPosts } from './endPoint';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};

export const useCountLike = (postId: string) => {
  return useQuery({
    queryKey: ['countLike', postId],
    queryFn: () => countLike(postId),
  });
};
