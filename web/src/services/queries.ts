import { useQuery } from '@tanstack/react-query';
import { countLike, getComments, getPosts, getSinglePost, getUser } from './endPoint';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};

export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getSinglePost(postId),
  });
};

export const useCountLike = (postId: string) => {
  return useQuery({
    queryKey: ['countLike', postId],
    queryFn: () => countLike(postId),
  });
};

export const useGetUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['getUser', userId],
    queryFn: () => getUser(userId),
  });
};

export const useListComments = (postId: string | undefined) => {
  return useQuery({
    queryKey: ['getComments', postId],
    queryFn: () => getComments(postId),
  });
};
