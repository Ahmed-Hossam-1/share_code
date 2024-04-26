import { db } from '../datastore';
import { ListLikesResponse } from '../types/api';
import { ExpressHandlerWithParams, Like, LikeComment } from '../types/types';

export const createLike = async (req: any, res: any) => {
  const { postId } = req.params;
  const userId = res.locals.userId;

  if (!postId) return res.sendStatus(400);
  if (!userId) return res.sendStatus(400);
  const getPost = await db.getPost(req.params.postId);
  if (!getPost) {
    return res.status(404).send({ error: 'ERRORS.POST_NOT_FOUND' });
  }

  let found = await db.exists({
    postId: req.params.postId,
    userId: res.locals.userId,
  });

  if (found) {
    return res.status(400).send({ error: 'ERRORS.DUPLICATE_LIKE' });
  }

  const insertLike: Like = {
    postId,
    userId,
  };

  db.createLike(insertLike);
  res.status(200).send({ like: insertLike });
};

export const deleteLike = async (req: any, res: any) => {
  const { postId } = req.params;
  const userId = res.locals.userId;
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

export const createLikeComment = async (req: any, res: any) => {
  const { commentId } = req.params;
  const userId = res.locals.userId;

  if (!commentId) return res.sendStatus(400);
  if (!userId) return res.sendStatus(400);
  const getComment = await db.getComment(req.params.commentId);
  if (!getComment) {
    return res.status(404).send({ error: 'ERRORS COMMENT NOT FOUND' });
  }

  let found = await db.existsComment({
    commentId: req.params.commentId,
    userId: res.locals.userId,
  });

  if (found) {
    return res.status(400).send({ error: 'ERRORS DUPLICATE LIKE' });
  }

  const insertLike: LikeComment = {
    commentId,
    userId,
  };

  db.createLikeComment(insertLike);
  res.status(200).send({ like: insertLike });
};

export const deleteLikeComment = async (req: any, res: any) => {
  const { commentId } = req.params;
  const userId = res.locals.userId;
  if (!commentId) return res.sendStatus(400);
  if (!userId) return res.sendStatus(400);

  const existpost = await db.getComment(commentId);
  if (!existpost) return res.status(400).send({ error: 'COMMENT NOT FOUND' });

  const deleteLike: LikeComment = {
    commentId,
    userId,
  };

  db.deleteLikeComment(deleteLike);
  res.sendStatus(200);
};

export const countLikeComment: ExpressHandlerWithParams<
  { commentId: string },
  null,
  ListLikesResponse
> = async (req, res) => {
  if (!req.params.commentId) {
    return res.status(400).send({ error: 'COMMENT ID MISSING' });
  }
  const count = await db.getLikesComment(req.params.commentId);
  return res.send({ likes: count });
};
