import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateRegister = [
  body('email').exists().isLength({ max: 254 }).notEmpty().trim().isEmail(),
  body('password').exists().isLength({ max: 255 }).notEmpty(),
  body('pseudo').exists().isLength({ max: 60 }).notEmpty(),
  body('image').exists().isLength({ max: 255 }).notEmpty(),
  body('birthdate').exists().isISO8601().toDate().notEmpty(),
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
