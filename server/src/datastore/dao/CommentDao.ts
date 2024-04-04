import { Comment } from '../../types/types';

export interface CommentDao {
  createComments(comment: Comment): Promise<void>;
  listComments(postId: string): Promise<Comment[]>;
  deleteComment(id: string): Promise<void>;
}
