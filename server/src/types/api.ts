import { Post, User } from './types';

// posts
export type CreatePostRequest = Pick<Post, 'title' | 'url'>;
export type CreatePostResponse = {};
export type ListPostRequest = {};
export type ListPostResponse = {};
export interface GetPostsRequest {}
export interface GetPostResponse {
  post: Post;
}

// users
export type SignUpRequest = Pick<
  User,
  'first_name' | 'last_name' | 'username' | 'email' | 'password'
>;
export interface SignUpResponse {
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
