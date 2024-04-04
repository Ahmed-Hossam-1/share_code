import express from 'express';
import { errHandler } from './src/middleware/errorMiddleware';
import { initDb } from './src/datastore';
import dotenv from 'dotenv';
import { authRouter } from './src/routes/auth.route';
import { postRouter } from './src/routes/post.route';

(async () => {
  await initDb();
  dotenv.config();

  const app = express();

  app.use(express.json());

  app.use('/api/auth', authRouter);
  app.use('/api/posts', postRouter);

  app.use(errHandler);

  app.listen(3000);
})();
