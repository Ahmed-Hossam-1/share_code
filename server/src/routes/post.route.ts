import express from 'express';
import { createPost, deletePost, listPosts, singlePost } from '../controller/post.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const postRouter = express.Router();

postRouter.route('/').post(authMiddleware, createPost).get(authMiddleware, listPosts);
postRouter.route('/:postId').get(authMiddleware, singlePost).delete(authMiddleware, deletePost);
