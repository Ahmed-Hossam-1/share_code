import express from 'express';
import { getCurrent, getUser, signInUser, signUpUser } from '../controller/auth.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import multer from 'multer';
import appError from '../utils/appError';

export const authRouter = express.Router();

const diskStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const fileFilter = (_: any, file: { mimetype: string }, cb: Function) => {
  const checkImg = file.mimetype.split('/')[0];
  console.log(checkImg, 'checkImg');
  if (checkImg === 'image') {
    return cb(null, true);
  } else {
    return cb(appError.create('file must be an image', 400, 'FILE_ERROR'), false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

authRouter.route('/signup').post(upload.single('avatar'), signUpUser);
authRouter.route('/signin').post(signInUser);
authRouter.route('/user').get(authMiddleware, getCurrent);
authRouter.route('/user/:id').get(getUser);
