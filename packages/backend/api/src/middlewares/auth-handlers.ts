import type { Response } from 'express';
import * as jose from 'jose';

import type { RegisterBody, Request } from '@app/types';

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

const secret = new TextEncoder().encode(JWT_SECRET);

export const hashPassword = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    // Get the password from the request body
    const { password } = req.body as RegisterBody;

    // Hash the password with bcrypt
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: 10,
    });

    // Set the hashed password on the request
    req.body.password = hashedPassword;

    next();
  } catch {
    return res.status(500).json({
      success: false,
      error: 'An error occurred while hashing the password.',
    });
  }
};

export const getUserId = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  // Get the JWT from the cookie
  const jwt = req.signedCookies.token;

  // If the JWT is not defined, return an error
  if (jwt === undefined) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

  try {
    // Verify the JWT and get the payload for getting the user id
    const { payload } = await jose.jwtVerify(jwt, secret, {
      issuer: FRONTEND_URL,
      audience: FRONTEND_URL,
    });

    // Set the userId on the request
    req.userId = payload.userId as number;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized!',
    });
  }
};
