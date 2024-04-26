import { Comment } from '../../types/types';

export interface CommentDao {
  createComments(comment: Comment): Promise<void>;
  listComments(postId: string, userId: string): Promise<Comment[]>;
  deleteComment(id: string): Promise<void>;
  countComments(postId: string): Promise<number>;
  getComment(id: string, userId?: string): Promise<Comment | undefined>;
}
