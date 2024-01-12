import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

const loginIdUser = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const jwt: string | undefined = req.signedCookies.token;
  const SECRET = new TextEncoder().encode(JWT_SECRET);

  if (jwt === undefined) {
    return res.json('not connected');
  }

  let payload;

  try {
    const result = await jose.jwtVerify(jwt, SECRET, {
      issuer: 'http://localhost',
      audience: 'http://localhost',
    });
    payload = result.payload;
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      return res.json('not connected');
    }
    return res.json('not connected');
  }

  if (!payload || typeof payload.sub !== 'string') {
    return res.json('Invalid JWT payload');
  }
  const userid = Number.parseInt(payload.sub);

  req.userId = userid;
  next();
};

export default loginIdUser;
