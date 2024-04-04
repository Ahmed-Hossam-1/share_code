import express from 'express';
import { createPost, listPosts } from '../controller/post.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const postRouter = express.Router();

postRouter.route('/').post(authMiddleware, createPost).get(authMiddleware, listPosts);
