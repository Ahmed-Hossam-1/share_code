import { Response } from 'express';
import { db } from '../datastore';
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  GetPostResponse,
  ListPostRequest,
  ListPostResponse,
} from '../types/api';
import { ExpressHandler, Post } from '../types/types';

export const listPosts: ExpressHandler<ListPostRequest, ListPostResponse> = async (__, res) => {
  const userId: string = res.locals.userId;
  // console.log(userId, 'userId');
  if (!userId) return res.sendStatus(401);
  const postDB = await db.listPosts();

  res.send({ posts: postDB });
};

export const createPost: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (
  req,
  res
) => {
  if (!req.body?.title || !req.body?.url || !req.body?.userId) {
    return res.sendStatus(400);
  }
  const newPost: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    postedAt: Date.now(),
  };

  await db.createPost(newPost);
  console.log('done', req.body);
  res.sendStatus(200);
};

export const singlePost = async (req: any, res: any) => {
  const postId: string | undefined = req.params.postId;
  if (!postId) {
    return res.sendStatus(400);
  }
  const post: any = await db.getPost(postId, res.locals.userId);
  if (!post) {
    return res.sendStatus(404);
  }
  const response: GetPostResponse = { post };
  res.send(response);
};

export const deletePost = async (req: any, res: Response<DeletePostResponse>) => {
  const postId: string | undefined = req.params.postId;
  if (!postId) return res.sendStatus(400);
  await db.deletePost(postId);
  return res.sendStatus(200);
};
