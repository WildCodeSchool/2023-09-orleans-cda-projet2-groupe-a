import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateLogin = [
  body('email').exists().isLength({ max: 254 }).trim().isEmail().notEmpty(),
  body('password').exists().isLength({ max: 255 }).trim().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ validationErrors: errors.array() });
    }
  },
];

export default validateLogin;
