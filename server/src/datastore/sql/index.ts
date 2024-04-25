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
      'INSERT INTO users (id,email,password,first_name,last_name,userName,avatar) VALUES (?,?,?,?,?,?,?)',
      _user.id,
      _user.email,
      _user.password,
      _user.first_name,
      _user.last_name,
      _user.username,
      _user.avatar
    );
  }

  getUserByEmail(_email: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, _email);
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE username = ?`, username);
  }

  listPosts(userId?: string): Promise<Post[]> {
    return this.db.all<Post[]>(
      `SELECT *, EXISTS(
        SELECT 1 FROM likes WHERE likes.postId = posts.id AND likes.userId = ?
      ) as liked FROM posts ORDER BY postedAt DESC`,
      userId
    );
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

  getUserById(id: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
  }

  async getPost(id: string, userId: string): Promise<Post | undefined> {
    return await this.db.get<Post>(
      `SELECT *, EXISTS(
        SELECT 1 FROM likes WHERE likes.postId = ? AND likes.userId = ?
      ) as liked FROM posts WHERE id = ?`,
      id,
      userId,
      id
    );
  }

  async deletePost(id: string): Promise<void> {
    await this.db.run('Delete FROM posts WHERE id = ?', id);
  }

  async createComments(comment: Comment): Promise<void> {
    await this.db.run(
      'INSERT INTO Comments(id, userId, postId, comment, postedAt) VALUES(?,?,?,?,?)',
      comment.id,
      comment.userId,
      comment.postId,
      comment.comment,
      comment.postedAt
    );
  }

  async listComments(postId: string): Promise<Comment[]> {
    return await this.db.all<Comment[]>(
      'SELECT * FROM comments WHERE postId = ? ORDER BY postedAt DESC',
      postId
    );
  }

  async deleteComment(id: string): Promise<void> {
    await this.db.run('DELETE FROM comments WHERE id = ?', id);
  }

  async countComments(postId: string): Promise<number> {
    const result = await this.db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM comments WHERE postId = ?',
      postId
    );
    return result?.count ?? 0;
  }

  async createLike(like: Like): Promise<void> {
    await this.db.run('INSERT INTO likes(userId, postId) VALUES(?,?)', like.userId, like.postId);
  }

  async deleteLike(like: Like): Promise<void> {
    await this.db.run(
      'DELETE FROM likes WHERE userId = ? AND postId = ?',
      like.userId,
      like.postId
    );
  }

  async getLikes(postId: string): Promise<number> {
    let result = await this.db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM likes WHERE postId = ?',
      postId
    );
    return result?.count ?? 0;
  }

  async exists(like: Like): Promise<boolean> {
    let awaitResult = await this.db.get<number>(
      'SELECT 1 FROM likes WHERE postId = ? and userId = ?',
      like.postId,
      like.userId
    );
    let val: boolean = awaitResult === undefined ? false : true;
    return val;
  }
}
