import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { InMemoryDataStore } from "./memorydb";
import { PostDao } from "./PostDao";
import { UserDao } from "./UserDao";

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao {}

export const db = new InMemoryDataStore();
