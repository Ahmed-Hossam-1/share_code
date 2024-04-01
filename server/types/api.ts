import { Post } from "./types";

export type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
export type CreatePostResponse = {};
export type ListPostRequest = {};
export type ListPostResponse = {};

export interface GetPostsRequest {}
export interface GetPostResponse {
  post: Post;
}
