import express, { ErrorRequestHandler } from 'express';
import { createPost, listPosts } from './controller/post.controller';
import { initDb } from './datastore';

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  app.get('/posts', listPosts);
  app.post('/posts', createPost);

  const errHandler: ErrorRequestHandler = (err, _, res, __) => {
    console.error(err);
    res.status(500).send('Something broke!');
  };

  app.use(errHandler);

  app.listen(3000);
})();
