import express from 'express';
import { getCurrent, signInUser, signUpUser } from '../controller/auth.controller';

export const authRouter = express.Router();

authRouter.route('/signup').post(signUpUser);
authRouter.route('/signin').post(signInUser);
authRouter.route('/user/:userId').get(getCurrent);
