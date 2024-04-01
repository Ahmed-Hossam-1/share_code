import { Comment } from "../types";

export interface CommentDao {
  createComments(comment: Comment): void;
  listComments(postId: string): Comment[];
  deleteComment(id: string): void;
}
