import { createJwt } from '../auth';
import { db } from '../datastore';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../types/api';
import { ExpressHandler, User } from '../types/types';
import crypto from 'crypto';

export const signUpUser: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { email, first_name, last_name, password, username } = req.body;
  if (!email || !first_name || !last_name || !password || !username) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));

  if (existing) {
    return res.status(403).send({ error: 'User already exists' });
  }

  const passwordHash = crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT || 'mmm', 50, 64, 'sha512')
    .toString('hex');

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    first_name,
    last_name,
    password: passwordHash,
    username,
  };

  await db.createUser(newUser);
  res.sendStatus(201).send({ jwt: createJwt({ userId: newUser.id }) });
};

export const signInUser: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.sendStatus(400);
  }

  const passwordHash = crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT || 'mmm', 50, 64, 'sha512')
    .toString('hex');

  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing || existing.password !== passwordHash) {
    return res.sendStatus(403);
  }

  return res.status(200).send({
    user: {
      id: existing.id,
      first_name: existing.first_name,
      last_name: existing.last_name,
      username: existing.username,
      email: existing.email,
    },
    jwt: createJwt({ userId: existing.id }),
  });
};
