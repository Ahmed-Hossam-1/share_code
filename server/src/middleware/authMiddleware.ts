import { verfiyJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler } from '../types/types';

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const authHeader = req.headers['Authorization'] || req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
      code: 401,
    });
  }
  const token = (authHeader as string).split(' ')[1];
  try {
    const payload = verfiyJwt(token);
    const user = await db.getUserById(payload.userId);
    if (!user) {
      throw 'not found user';
    }
    res.locals.userId = user.id;
    console.log(res.locals.userId, 'userrrrrrrr');

    return next();
  } catch {
    return res.status(401).send({ error: 'bad token' });
  }
};
