import express from "express";
import { createPost, listPosts } from "./controller/post.controller";

const app = express();

app.use(express.json());

app.get("/posts", listPosts);
app.post("/posts", createPost);

app.listen(3000);
