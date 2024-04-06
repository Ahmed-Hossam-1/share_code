import express from 'express';
import { countLike, createLike, deleteLike } from '../controller/like.controller';

export const likeRouter = express.Router();

likeRouter.route('/:postId').post(createLike).get(countLike).delete(deleteLike);
