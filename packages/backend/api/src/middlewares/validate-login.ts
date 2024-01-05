import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateLogin = [
  body('email')
    .exists()
    .trim()
    .notEmpty()
    .isLength({ max: 254 })
    .toLowerCase()
    .isEmail(),
  body('password').exists().trim().notEmpty().isLength({ min: 10, max: 255 }),
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
