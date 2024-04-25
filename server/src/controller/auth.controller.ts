import { createJwt } from '../auth';
import { db } from '../datastore';
import {
  GetCurrentUserRequest,
  GetCurrentUserResponse,
  GetUserRequest,
  GetUserResponse,
  SignInRequest,
  SignInResponse,
} from '../types/api';
import { ExpressHandler, ExpressHandlerWithParams, User } from '../types/types';
import crypto from 'crypto';
import { passwordHash } from '../utils/passwordHash';

export const signUpUser = async (req: any, res: any) => {
  const { email, first_name, last_name, password, username } = req.body;
  console.log(email, last_name, first_name, password, username, 'fffffffffffffff');
  if (!email || !first_name || !last_name || !password || !username) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));

  if (existing) {
    return res.status(403).send({ error: 'User already exists' });
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: email,
    first_name: first_name,
    last_name: last_name,
    password: passwordHash(password),
    username: username,
    avatar: req.file.filename,
  };

  await db.createUser(newUser);
  const jwt = await createJwt({ userId: newUser.id });
  res.status(201).send({
    user: {
      id: newUser.id,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      avatar: req.file.filename,
    },
    jwt,
  });
};

export const signInUser: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.sendStatus(400);
  }

  const passwordcom = passwordHash(password);

  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing || existing.password !== passwordcom) {
    return res.sendStatus(403);
  }

  const jwt = await createJwt({ userId: existing.id });

  return res.status(200).send({
    user: {
      id: existing.id,
      first_name: existing.first_name,
      last_name: existing.last_name,
      username: existing.username,
      email: existing.email,
    },
    jwt: jwt,
  });
};

export const getCurrent: ExpressHandler<GetCurrentUserRequest, GetCurrentUserResponse> = async (
  __,
  res
) => {
  const user = await db.getUserById(res.locals.userId);
  if (!user) {
    return res.sendStatus(500);
  }

  return res.send({
    id: user.id,
    first_name: user.username,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  });
};

export const getUser: ExpressHandlerWithParams<
  { id: string },
  GetUserRequest,
  GetUserResponse
> = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);

  const user = await db.getUserById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  return res.send({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  });
};
