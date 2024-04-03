import { db } from '../datastore';
import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostRequest,
  ListPostResponse,
} from '../types/api';
import { ExpressHandler, Post } from '../types/types';

export const listPosts: ExpressHandler<ListPostRequest, ListPostResponse> = async (__, res) => {
  res.send({ posts: await db.listPosts() } as ListPostResponse);
};

export const createPost: ExpressHandler<CreatePostRequest, CreatePostResponse> = (req, res) => {
  if (!req.body?.title || !req.body?.url) {
    return res.sendStatus(400);
  }
  const newPost: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId,
    postedAt: Date.now(),
  };

  db.createPost(newPost);
  console.log('done', req.body);
  res.sendStatus(200);
};
