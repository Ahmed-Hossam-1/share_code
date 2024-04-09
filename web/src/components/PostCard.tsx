/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Post } from '../types/types';

const PostCard: FC<{ post: Post; refetch: () => unknown; hideDiscuss?: boolean }> = ({
  post,
  refetch,
  hideDiscuss,
}) => {
  return <div>posts</div>;
};

export default PostCard;
