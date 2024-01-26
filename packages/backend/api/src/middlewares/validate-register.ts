import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateRegister = [
  body('email')
    .exists()
    .trim()
    .notEmpty()
    .isLength({ max: 254 })
    .toLowerCase()
    .isEmail(),
  body('password').exists().trim().notEmpty().isLength({ min: 9, max: 255 }),
  body('pseudo').exists().trim().notEmpty().isLength({ min: 5, max: 60 }),
  body('birthdate')
    .exists()
    .trim()
    .notEmpty()
    .isISO8601({
      strict: false,
      strictSeparator: false,
    })
    .toDate(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ validationErrors: errors.array() });
    }
  },
];

export default validateRegister;
