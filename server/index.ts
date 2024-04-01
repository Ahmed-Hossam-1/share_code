import express from "express";
import { db } from "./datastore";

const app = express();

app.use(express.json());

app.get("/posts", (__, res) => {
  res.send({ posts: db.listPosts() });
});

app.post("/posts", (req: any, res: any) => {
  const post = req.body;
  db.createPost(post);
  console.log("done", req.body);
  res.sendStatus(200);
});

app.listen(3000);
