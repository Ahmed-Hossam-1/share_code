import { Comment } from '../types/types';

export interface CommentDao {
  createComments(comment: Comment): void;
  listComments(postId: string): Comment[];
  deleteComment(id: string): void;
}
