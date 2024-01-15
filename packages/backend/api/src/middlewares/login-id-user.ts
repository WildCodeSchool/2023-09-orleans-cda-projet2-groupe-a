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
  console.log(req.signedCookies);
  console.log(req);

  console.log('jwt', jwt);

  const SECRET = new TextEncoder().encode(JWT_SECRET);
  console.log(SECRET);

  if (jwt === undefined) {
    return res.json({ result: 'not connected' });
  }

  try {
    const result = await jose.jwtVerify(jwt, SECRET, {
      issuer: 'http://localhost',
      audience: 'http://localhost',
    });

    if (!result.payload || typeof result.payload.sub !== 'string') {
      return res.json({ result: 'Invalid JWT payload' });
    }
    const userid = Number.parseInt(result.payload.sub);

    req.userId = userid;
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      return res.json({ result: 'not connected' });
    }
    return res.json({ result: 'not connected' });
  }

  next();
};

export default loginIdUser;
