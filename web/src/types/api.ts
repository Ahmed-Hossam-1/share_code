/* eslint-disable @typescript-eslint/ban-types */
import { Comment, Post, User } from './types';

// posts
export type CreatePostRequest = Pick<Post, 'title' | 'url'>;
export type CreatePostResponse = {};
export type ListPostRequest = {};
export type ListPostResponse = {
  posts: Post[];
};
export type GetPostsRequest = Pick<Post, 'id'>;
export interface GetPostResponse {
  post: Post;
}
export type DeletePostRequest = { postId: string };
export type DeletePostResponse = {};
// comments
export type CreateCommentRequest = Pick<Comment, 'comment' | 'userId'>;
export interface CreateCommentResponse {}
export type CountCommentsRequest = { postId: string };
export type CountCommentsResponse = { count: number };
export interface ListCommentsResponse {
  comments: Comment[];
}
export type DeleteCommentResponse = {};
export type DeleteCommentRequest = {};
// users
export type GetCurrentUserRequest = Pick<User, 'id'>;
export type GetCurrentUserResponse = Pick<
  User,
  'id' | 'first_name' | 'last_name' | 'username' | 'email'
>;
export type SignUpRequest = Pick<User, 'first_name' | 'last_name' | 'username' | 'email'>;
export interface SignUpResponse {
  user: Pick<User, 'first_name' | 'last_name' | 'username' | 'email' | 'id'>;
  jwt: string;
}
export interface SignInRequest {
  login: string; // email or password
  password: string;
}
export type SignInResponse = {
  user: Pick<User, 'first_name' | 'last_name' | 'username' | 'email' | 'id'>;
  jwt: string;
};
