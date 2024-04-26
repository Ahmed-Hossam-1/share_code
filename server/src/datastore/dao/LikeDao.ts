import { Like, LikeComment } from '../../types/types';

export interface LikeDao {
  createLike(like?: Like): Promise<void>;
  deleteLike(like: Like): Promise<void>;
  getLikes(postId: string): Promise<number>;
  exists(like: Like): Promise<boolean>;
}

export interface LikeCommentDao {
  createLikeComment(like: LikeComment): Promise<void>;
  deleteLikeComment(like: LikeComment): Promise<void>;
  getLikesComment(commentId: string): Promise<number>;
  existsComment(like: LikeComment): Promise<boolean>;
}
