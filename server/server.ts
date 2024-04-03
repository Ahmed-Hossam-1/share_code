import express from 'express';
import { createPost, listPosts } from './controller/post.controller';
import { initDb } from './datastore';
import { signInUser, signUpUser } from './controller/auth.controller';
import { errHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';

(async () => {
  await initDb();
  dotenv.config();

  const app = express();

  app.use(express.json());
  app.post('/signup', signUpUser);
  app.post('/signin', signInUser);
  app.use(authMiddleware);
  app.get('/posts', listPosts);
  app.post('/posts', createPost);

  app.use(errHandler);

  app.listen(3000);
})();
