import express from 'express';
import { createComments, deleteComment, listComments } from '../controller/comments.controller';

export const commmentRouter = express.Router();

commmentRouter.route('/:postId').post(createComments).get(listComments);
commmentRouter.route('/:commentId').delete(deleteComment);
