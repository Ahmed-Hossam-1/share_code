import { useQuery } from '@tanstack/react-query';
import {
  countLike,
  countLikeComments,
  getComments,
  getPosts,
  getSinglePost,
  getUser,
} from './endPoint';

// export const usePosts = () => {
//   return useQuery({
//     queryKey: ['posts'],
//     queryFn: getPosts,
//   });
// };
export const usePosts = (pageParam: number) => {
  return useQuery({
    queryKey: ['posts', { pageParam, pageSize: 8 }],
    queryFn: () => getPosts({ pageParam, pageSize: 8 }),
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

export const useCountLikeComment = (commentId: string) => {
  return useQuery({
    queryKey: ['countLikeComments', commentId],
    queryFn: () => countLikeComments(commentId),
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
