import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

interface RequestWithUser extends Request {
  userId?: number;
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
    return res.json({ ok: false, message: 'not connected' });
  }
  console.log(jwt);

  try {
    const result = await jose.jwtVerify(jwt, SECRET, {
      issuer: 'http://localhost',
      audience: 'http://localhost',
    });
    console.log(result.payload.sub);

    if (!result.payload || typeof result.payload.sub !== 'string') {
      return res.json({ ok: false, message: 'not connected' });
    }
    const userid = Number.parseInt(result.payload.sub);
    console.log(userid);

    req.userId = userid;
  } catch (error) {
    console.log({ error });
    if (error instanceof jose.errors.JWTExpired) {
      return res.json({ ok: false, message: 'not connected' });
    }

    return res.json({ ok: false, message: 'not connected' });
  }

  next();
};

export default loginIdUser;
