import express from 'express';
import { getCurrent, getUser, signInUser, signUpUser } from '../controller/auth.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const authRouter = express.Router();

authRouter.route('/signup').post(signUpUser);
authRouter.route('/signin').post(signInUser);
authRouter.route('/user').get(authMiddleware, getCurrent);
authRouter.route('/user/:id').get(getUser);
