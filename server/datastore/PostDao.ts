import { Post } from "../types/types";

export interface PostDao {
  listPosts(): Post[];
  createPost(post: Post): void;
  getPost(id: string): Post | undefined;
  deletePost(id: string): void;
}
