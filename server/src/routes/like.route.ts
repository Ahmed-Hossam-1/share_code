import express from 'express';
import {
  countLike,
  countLikeComment,
  createLike,
  createLikeComment,
  deleteLike,
  deleteLikeComment,
} from '../controller/like.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const likeRouter = express.Router();

likeRouter.route('/:postId').get(authMiddleware, createLike).delete(authMiddleware, deleteLike);
likeRouter.route('/:postId/count').get(countLike);
likeRouter
  .route('/comments/:commentId')
  .get(authMiddleware, createLikeComment)
  .delete(authMiddleware, deleteLikeComment);
likeRouter.route('/comments/:commentId/count').get(countLikeComment);
