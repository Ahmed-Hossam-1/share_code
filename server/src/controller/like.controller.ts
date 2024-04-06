import { db } from '../datastore';
import { ListLikesResponse } from '../types/api';
import { ExpressHandlerWithParams, Like } from '../types/types';

export const createLike: ExpressHandlerWithParams<{ postId: string }, { userId: string }, {}> = (
  req,
  res
) => {
  const { postId } = req.params;
  const { userId } = req.body;
  if (!postId) return res.sendStatus(400);
  if (!userId) return res.sendStatus(400);
  const insertLike: Like = {
    postId,
    userId,
  };
  db.createLike(insertLike);
  res.sendStatus(200);
};

export const deleteLike: ExpressHandlerWithParams<
  { postId: string },
  { userId: string },
  {}
> = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  if (!postId) return res.sendStatus(400);
  if (!userId) return res.sendStatus(400);

  const existpost = await db.getPost(postId);
  if (!existpost) return res.status(400).send({ error: 'POST NOT FOUND' });

  const deleteLike: Like = {
    postId,
    userId,
  };
  db.deleteLike(deleteLike);
  res.sendStatus(200);
};

export const countLike: ExpressHandlerWithParams<
  { postId: string },
  null,
  ListLikesResponse
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'POST ID MISSING' });
  }
  const count = await db.getLikes(req.params.postId);
  return res.send({ likes: count });
};
