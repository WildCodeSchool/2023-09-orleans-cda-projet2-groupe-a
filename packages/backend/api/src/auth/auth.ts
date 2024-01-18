/* eslint-disable @typescript-eslint/require-await */
import type { Request, Response } from 'express';
import express, { Router } from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import type { AuthBody } from '@app/types';

import { hashPassword } from '@/middlewares/auth-handlers';

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Throw an error if the JWT_SECRET environment variable is not defined
if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET is not defined');
}

// Encode the JWT secret
const secret = new TextEncoder().encode(JWT_SECRET);

const authRouter = express.Router();

// Route to register a new user
authRouter.post('/registration', hashPassword, async (req, res) => {
  try {
    // Getting email and password from request body, followed by password hashing
    const { firstname, lastname, birthdate, gender, country, email, password } =
      req.body;

    // Creating user object with the data from request body
    const data = {
      firstname,
      lastname,
      birthdate: new Date(birthdate),
      gender,
      country,
      email,
      password,
      created_at: new Date(),
    };

    // Insert new user into database
    const result = await db.insertInto('consumer').values(data).execute();

    // Get userId inserted
    const userId = Number(result[0].insertId);

    // Creating JWT token with Jose library
    const jwt = await new jose.SignJWT({ sub: email, userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(String(FRONTEND_URL))
      .setAudience(String(FRONTEND_URL))
      .setExpirationTime('2h')
      .sign(secret);

    // A cookie containing the JWT token
    res.cookie('token', jwt, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    try {
      await jose.jwtVerify(jwt, secret, {
        issuer: FRONTEND_URL,
        audience: FRONTEND_URL,
      });
    } catch {
      return res.status(401).json({
        ok: false,
        isLoggedIn: false,
      });
    }

    return res.json({ ok: true, isLoggedIn: true });
  } catch (error) {
    return res.json({ ok: false, isLoggedIn: false, error });
  }
});

// Route to check the JWT token in the cookie and verify if the user is logged in
authRouter.get('/verify', async (req, res) => {
  // Get the JWT from the cookie
  const jwt: string | undefined = req.signedCookies.token;

  // If the JWT is undefined, return an error
  if (jwt === undefined) {
    return res.json({
      ok: false,
      isLoggedIn: false,
    });
  }

  try {
    // Verify the JWT and get the payload for getting the user id
    const { payload } = await jose.jwtVerify(jwt, secret, {
      issuer: FRONTEND_URL,
      audience: FRONTEND_URL,
    });

    return res.json({
      ok: true,
      isLoggedIn: true,
      userId: payload.userId,
    });
  } catch (error) {
    // If the JWT is expired
    if (error instanceof jose.errors.JWTExpired) {
      return res.json({
        ok: false,
        isLoggedIn: false,
      });
    }

    return res.json({
      ok: false,
      isLoggedIn: false,
      error,
    });
  }
});

// Route to login a user
authRouter.post('/login', async (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body as AuthBody;

  try {
    // Get the user from the database
    const user = await db
      .selectFrom('consumer')
      .select(['consumer.id', 'consumer.password'])
      .where('consumer.email', '=', email)
      .executeTakeFirst();

    // If the user doesn't exist, return an error
    if (user === undefined) {
      return res.json({
        ok: false,
        email: 'User does not exist',
        isLoggedIn: false,
      });
    }

    // Verify the password
    const isCorrectPassword = await Bun.password.verify(
      password, // password provided by the user
      user.password, // password stored in the database
      'bcrypt', // hashing algorithm used
    );

    // If the password is incorrect, return an error
    if (!isCorrectPassword) {
      return res.json({
        ok: false,
        isLoggedIn: false,
      });
    }

    // Create a new JWT with the library jose
    const jwt = await new jose.SignJWT({
      sub: email,
      userId: user.id, // Add the user id to the JWT payload
    })
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setIssuer(String(FRONTEND_URL))
      .setAudience(String(FRONTEND_URL))
      .setExpirationTime('2h')
      .sign(secret);

    // Define the cookie token with the JWT
    res.cookie('token', jwt, {
      httpOnly: true, // The cookie is not accessible via JavaScript but only via HTTP(S)
      sameSite: true, // The cookie is not accessible via cross-site requests
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    return res.json({
      ok: true,
      isLoggedIn: isCorrectPassword,
    });
  } catch (error) {
    return res.json({
      ok: false,
      isLoggedIn: false,
      error,
    });
  }
});

authRouter.post('/logout', async (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'lax',
    expires: new Date(0),
  });
  res.status(200).send('Déconnecté avec succès');
});

export default authRouter;
