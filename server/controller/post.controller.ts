import { db } from "../datastore";
import { ExpressHandler, Post } from "../types/types";

export const listPosts: ExpressHandler<{}, {}> = (__, res) => {
  res.send({ posts: db.listPosts() });
};

type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
type CreatePostResponse = {};

export const createPost: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
  if (!req.body?.title || !req.body?.url || !req.body?.userId) {
    return res.sendStatus(400);
  }
  const newPost: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    postedAt: Date.now(),
  };

  db.createPost(newPost);
  console.log("done", req.body);
  res.sendStatus(200);
};
