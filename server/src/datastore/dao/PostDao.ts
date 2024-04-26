import { Post } from '../../types/types';

export interface PostDao {
  listPosts(userId?: string, options?: { page?: number; pageSize?: number }): Promise<Post[]>;
  createPost(post: Post): Promise<void>;
  getPost(id: string, userId?: string): Promise<Post | undefined>;
  deletePost(id: string): Promise<void>;
  getPostByUrl(url: string): Promise<Post | undefined>;
}
