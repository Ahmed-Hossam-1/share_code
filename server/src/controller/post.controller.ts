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

export const listPosts: ExpressHandler<ListPostRequest, ListPostResponse> = async (req, res) => {
  const userId: string = res.locals.userId;
  if (!userId) return res.sendStatus(401);
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  try {
    const postDB = await db.listPosts(userId, { page, pageSize });
    res.send({ posts: postDB });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch posts.' });
  }
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
  const userId = res.locals.userId;
  if (!userId) return res.sendStatus(401);
  const post: any = await db.getPost(postId, userId);
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
