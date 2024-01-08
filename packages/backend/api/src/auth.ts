import type { Request, Response } from 'express';
import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import type { AuthLoginBody, AuthRegisterBody } from '@app/types';

import validateLogin from './middlewares/validate-login';
import validateRegister from './middlewares/validate-register';

const JWT_SECRET = process.env.JWT_SECRET;
const isProduction: boolean = process.env.NODE_ENV === 'production';

// Condition préliminaire qui fait crasher l'appli si le JWT secret n'existe pas.
// Cela arrivera jusqu'à ce que le JWT_SECRET soit renseigné.
if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET undefined');
}

const SECRET = new TextEncoder().encode(JWT_SECRET);
const authRouter = express.Router();

authRouter.get('/check', async (req, res) => {
  //bien vérifier le booléen de signed plus bas. d'où req.cookies ou req.signedCookies.
  const jwt: string | undefined = req.signedCookies.token;

  //On vérifie si l'on est toujours connecté (si le jwt existe bien)
  if (jwt === undefined) {
    return res.json({
      ok: true,
      isLoggedIn: false,
    });
  }

  try {
    await jose.jwtVerify(jwt, SECRET, {
      //options
      issuer: 'http://localhost',
      audience: 'http://localhost',
    });
    // On peut ici console.log({ check }) qui contient le payload qu'on peut détailler/vérifier.

    return res.json({
      ok: true,
      isLoggedIn: true,
    });
  } catch (error) {
    //si l'erreur est le jwt expiré, on renvoie une erreur dédiée.
    if (error instanceof jose.errors.JWTExpired) {
      return res.json({
        ok: true,
        isLoggedIn: false,
      });
    }
    //si l'erreur n'est pas le jwt expiré, on renvoie une erreur par défaut.
    return res.json({
      ok: false,
      error,
    });
  }
});

authRouter.post(
  '/register',
  validateRegister,
  async (req: Request, res: Response) => {
    const { email, password, pseudo, birthdate } = req.body as AuthRegisterBody;

    try {
      const hashedPassword = await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: 15,
      });

      await db
        .insertInto('user')
        .values({
          email,
          password: hashedPassword,
          pseudo,
          birthdate,
        })
        .execute();
      // ajouter la logique du JWT + génération d'un cookie ici.

      const jwt = await new jose.SignJWT({
        sub: email,
      })
        .setProtectedHeader({
          alg: 'HS256',
        })
        .setIssuedAt()
        .setIssuer('http://localhost')
        .setAudience('http://localhost')
        .setExpirationTime('5m')
        .sign(SECRET);

      // Envoi du jwt dans le token via l'objet res.
      // Param1 qu'on appelle arbitrairement 'token'. Param2, le jwt.
      // Puis options sous forme d'un objet qui définissent le niveau de sécurité du cookie.

      res.cookie('token', jwt, {
        httpOnly: true, //signifie au client que le cookie est inaccessible.
        sameSite: 'strict', //Permet au cookie de ne pas être utilisé sur d'autres sites.
        secure: isProduction, //correspond au HTTPS, en prod. (Cf. variable d'environnement)
        signed: true,
      });

      return res.json({
        ok: true,
      });
    } catch (error) {
      return res.json({
        ok: false,
        error,
      });
    }
  },
);

authRouter.post(
  '/login',
  validateLogin,
  async (req: Request, res: Response) => {
    const { email, password } = req.body as AuthLoginBody;
    try {
      const user = await db
        .selectFrom('user')
        .select(['user.password'])
        .where('user.email', '=', email)
        .executeTakeFirst();

      if (user === undefined) {
        return res.json({
          ok: true,
          isLoggedIn: false,
        });
      }

      const isCorrectPassword = await Bun.password.verify(
        password,
        user.password, //à récuperer dans la BDD donc querybuilder ci-dessus l.90)
        'bcrypt',
      );

      if (!isCorrectPassword) {
        return res.json({
          ok: true,
          isLoggedIn: false,
        });
      }

      // Dans le cas inverse, on appelle la méthode signJWT de jose pour générer un jwt.
      // Ce JWT va être utilisé pour hâcher le mot de passe.
      // On le place en haut du fichier, sous les imports, après le if qui vérifie
      // l'existence du JWT ou fait crasher l'appli, le cas échéant.

      const jwt = await new jose.SignJWT({
        sub: email,
      })
        .setProtectedHeader({
          alg: 'HS256',
        })
        .setIssuedAt()
        .setIssuer('http://localhost')
        .setAudience('http://localhost')
        .setExpirationTime('2h')
        .sign(SECRET);

      // Envoi du jwt dans le token via l'objet res.
      // Param1 qu'on appelle arbitrairement 'token'. Param2, le jwt.
      // Puis options sous forme d'un objet qui définissent le niveau de sécurité du cookie.

      res.cookie('token', jwt, {
        httpOnly: true, //signifie au client que le cookie est inaccessible.
        sameSite: 'strict', //Permet au cookie de ne pas être utilisé sur d'autres sites.
        secure: isProduction, //correspond au HTTPS, en prod. (Cf. variable d'environnement)
        signed: true,
      });

      return res.json({
        ok: true,
        isLoggedIn: isCorrectPassword,
      });
    } catch (error) {
      return res.json({
        ok: false,
        error,
      });
    }
  },
);

export { authRouter };
