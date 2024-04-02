import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

import { DataStore } from '..';
import { User, Post, Like, Comment } from '../../types/types';

export class SqlDataStore implements DataStore {
  public async openDb() {
    const db = await open({
      filename: path.join(__dirname, 'sharecode.sqlite'),
      driver: sqlite3.Database,
    });

    await db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }

  createUser(_user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(_email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByUsername(_userName: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  listPosts(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  createPost(_post: Post): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getPost(_id: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createLike(_like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createComments(_comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listComments(_postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
