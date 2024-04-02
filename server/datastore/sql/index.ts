import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

import { DataStore } from '..';
import { User, Post, Like, Comment } from '../../types/types';

export class SqlDataStore implements DataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    this.db = await open({
      filename: path.join(__dirname, 'sharecode.sqlite'),
      driver: sqlite3.Database,
    });

    this.db.run('PRAGMA foreign_keys = ON;');

    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }

  async createUser(_user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id,email,password,first_name,last_name,userName) VALUES (?,?,?,?,?,?)',
      _user.id,
      _user.email,
      _user.password,
      _user.first_name,
      _user.last_name,
      _user.username
    );
  }
  getUserByEmail(_email: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, _email);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE username = ?`, username);
  }
  listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>('SELECT * FROM posts');
  }
  async createPost(_post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts (id,title,url,postedAt,user_id) VALUES (?,?,?,?,?)', // more security (sql injection)
      _post.id,
      _post.title,
      _post.url,
      _post.postedAt,
      _post.userId
    );
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
