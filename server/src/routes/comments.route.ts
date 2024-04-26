import express from 'express';
import {
  countComments,
  createComments,
  deleteComment,
  listComments,
} from '../controller/comments.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const commmentRouter = express.Router();

commmentRouter
  .route('/:postId')
  .post(authMiddleware, createComments)
  .get(authMiddleware, listComments);
commmentRouter.route('/:commentId').delete(deleteComment);
commmentRouter.route('/:postId/count').get(countComments);
