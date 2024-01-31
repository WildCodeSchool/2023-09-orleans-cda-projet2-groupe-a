import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

interface RequestWithUser extends Request {
  userId?: number;
  login?: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET;

const loginIdUser = async function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  const jwt: string | undefined = req.signedCookies.token;

  const SECRET = new TextEncoder().encode(JWT_SECRET);

  if (jwt === undefined) {
    req.login = false;
    next();
    return;
  }

  try {
    const result = await jose.jwtVerify(jwt, SECRET, {
      issuer: 'http://localhost',
      audience: 'http://localhost',
    });

    if (!result.payload || typeof result.payload.sub !== 'string') {
      req.login = false;
      next();
      return;
    }
    const userid = Number.parseInt(result.payload.sub);

    req.userId = userid;
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      req.login = false;
      next();
      return;
    }
    req.login = false;
    next();
    return;
  }
  req.login = true;
  next();
};

export default loginIdUser;
