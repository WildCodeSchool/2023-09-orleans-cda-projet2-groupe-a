import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateRegister = [
  body('email').exists().isLength({ max: 254 }).isEmail(),
  body('password').exists().isLength({ max: 255 }),
  body('pseudo').exists().isLength({ max: 60 }),
  body('birthdate').exists().isISO8601().toDate(),
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
