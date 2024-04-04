import { ErrorRequestHandler } from 'express';

export const errHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error(err);
  res.status(500).send('Something broke!');
};
