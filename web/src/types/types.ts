/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  avatar?: any;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  user_id: string;
  postedAt: number;
  liked?: boolean;
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
  liked?: boolean;
}

export interface jwtType {
  jwt: string;
}

export interface TNewPost {
  url: string;
  title: string;
  userId: string;
}
