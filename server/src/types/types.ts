import { RequestHandler } from 'express';
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
}

export interface Like {
  userId: string;
  postId: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  postedAt: number;
}

export type withError<T> = T & { error: string };
export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<withError<Res>>,
  Partial<Req>,
  any
>;

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<withError<Res>>,
  Partial<Req>,
  any
>;

export interface jwtType {
  userId: string;
}
