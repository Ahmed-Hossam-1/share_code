import jwt from 'jsonwebtoken';
import { jwtType } from './types/types';

export const createJwt = (arg: jwtType): string => {
  return jwt.sign(arg, getJwt(), {
    expiresIn: '7d',
  });
};

export const verfiyJwt = (token: string): jwtType => {
  return jwt.verify(token, getJwt()) as jwtType;
};

const getJwt = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return secret;
};
