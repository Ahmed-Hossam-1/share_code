import express from 'express';
import { signInUser, signUpUser } from '../controller/auth.controller';

export const authRouter = express.Router();

authRouter.route('/signup').post(signUpUser);
authRouter.route('/signin').post(signInUser);
