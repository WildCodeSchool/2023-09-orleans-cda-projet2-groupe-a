import type { NextFunction, Request, Response } from 'express';

interface RequestWithUser extends Request {
  userId: number;
  isloggedIn?: boolean;
}

const blockNotLogin = function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  const isloggedIn = req.isloggedIn;
  const userId = req.userId;

  if (!isloggedIn) {
    return res.json({ ok: false, message: 'not connected' });
  }
  if (!userId) {
    return res.json({ ok: false, message: 'not connected' });
  }

  next();
  return;
};

export default blockNotLogin;
