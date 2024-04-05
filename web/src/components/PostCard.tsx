/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Post } from '../types/types';

const PostCard: FC<{ post: Post; refetch: () => unknown; hideDiscuss?: boolean }> = ({
  post,
  refetch,
  hideDiscuss,
}) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.url}</p>
      {hideDiscuss && <button onClick={() => refetch()}>refresh</button>}
      {!hideDiscuss && [
        <p key="1">{post.postedAt}</p>,
        <button key="2" onClick={() => refetch()}>
          refresh
        </button>,
      ]}
      {(post as any).comments?.map((comment: any) => (
        <div key={comment.id}>
          <p>{comment.comment}</p>
        </div>
      ))}
      {!hideDiscuss && <input />}
      {!hideDiscuss && <button>Comment</button>}
    </div>
  );
};

export default PostCard;
