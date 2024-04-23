import express from 'express';
import { countLike, createLike, deleteLike } from '../controller/like.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const likeRouter = express.Router();

likeRouter.route('/:postId').get(authMiddleware, createLike).delete(authMiddleware, deleteLike);
likeRouter.route('/:postId/count').get(countLike);
