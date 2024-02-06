import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

interface RequestWithUser extends Request {
  userId?: number;
  isloggedIn?: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET;

const checkAuthState = async function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  req.isloggedIn = false;
  const jwt: string | undefined = req.signedCookies.token;

  const SECRET = new TextEncoder().encode(JWT_SECRET);

  if (jwt === undefined) {
    next();
    return;
  }

  try {
    const result = await jose.jwtVerify(jwt, SECRET, {
      issuer: 'http://localhost',
      audience: 'http://localhost',
    });

    if (!result.payload || typeof result.payload.sub !== 'string') {
      next();
      return;
    }
    const userid = Number.parseInt(result.payload.sub);
    req.isloggedIn = true;
    req.userId = userid;
  } catch {
    next();
    return;
  }
  next();
};

export default checkAuthState;
