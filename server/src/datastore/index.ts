import { CommentDao } from './dao/CommentDao';
import { LikeCommentDao, LikeDao } from './dao/LikeDao';
// import { InMemoryDataStore } from './memorydb';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
import { SqlDataStore } from './sql';

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao, LikeCommentDao {}

export let db: DataStore;

export async function initDb() {
  //   db = new InMemoryDataStore();
  db = await new SqlDataStore().openDb();
}
