import express from 'express';
import { getCurrent, signInUser, signUpUser } from '../controller/auth.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const authRouter = express.Router();

authRouter.route('/signup').post(signUpUser);
authRouter.route('/signin').post(signInUser);
authRouter.route('/user').get(authMiddleware, getCurrent);
