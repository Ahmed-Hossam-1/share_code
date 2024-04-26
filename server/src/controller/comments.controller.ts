import { db } from '../datastore';
import { CountCommentsResponse, DeleteCommentResponse } from '../types/api';
import { Comment, ExpressHandlerWithParams } from '../types/types';
import crypto from 'crypto';

export const createComments = async (req: any, res: any) => {
  const comment = req.body.comment;

  if (!req.params.postId) return res.status(400).send({ error: 'ID MISSING' });
  if (!comment) return res.status(400).send({ error: 'COMMENTS MISSING' });

  const existpost = await db.getPost(req.params.postId);
  if (!existpost) return res.status(400).send({ error: 'POST NOT FOUND' });

  const newComment: Comment = {
    id: crypto.randomUUID(),
    postId: req.params.postId,
    userId: res.locals.userId,
    comment: comment,
    postedAt: Date.now(),
  };
  console.log(newComment, 'commenst');
  await db.createComments(newComment);
  res.sendStatus(200);
};

export const listComments = async (req: any, res: any) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'POST ID MISSING' });
  }
  if (!res.locals.userId) return res.status(401).send({ error: 'UNAUTHORIZED' });
  const comments = await db.listComments(req.params.postId, res.locals.userId);
  return res.send({ comments });
};

export const deleteComment: ExpressHandlerWithParams<
  { commentId: string },
  null,
  DeleteCommentResponse
> = async (req, res) => {
  if (!req.params.commentId) return res.status(404).send({ error: 'COMMENT ID MISSING' });
  await db.deleteComment(req.params.commentId);
  return res.sendStatus(200);
};

export const countComments: ExpressHandlerWithParams<
  { postId: string },
  null,
  CountCommentsResponse
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'POST ID MISSING' });
  }
  const count = await db.countComments(req.params.postId);
  return res.send({ count });
};
