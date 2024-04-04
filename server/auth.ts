import jwt from 'jsonwebtoken';
import { jwtType } from './types/types';

export const createJwt = async (payload: jwtType): Promise<string> => {
  const token = await jwt.sign(payload, getJwt(), {
    expiresIn: '30m',
  });
  return token;
};

export const verfiyJwt = (token: string): jwtType => {
  console.log(process.env.JWT_SECRET);
  return jwt.verify(token, getJwt()) as jwtType;
};

const getJwt = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return secret;
};
