import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateUpdateUser = [
  body('email')
    .exists()
    .trim()
    .notEmpty()
    .isLength({ max: 254 })
    .toLowerCase()
    .isEmail(),
  body('color')
    .exists()
    .trim()
    .notEmpty()
    .isLength({ max: 255 })
    .custom((value) => {
      const validColors = [
        'red',
        'blue',
        'green',
        'yellow',
        'purple',
        'orange',
        'pink',
      ];
      if (!validColors.includes(value)) {
        throw new Error('Color must be one of the proposed choices');
      }
      return true;
    }),
  body('image').exists().trim().notEmpty().isLength({ max: 254 }),
  body('password').exists().trim().notEmpty().isLength({ min: 3, max: 255 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ validationErrors: errors.array() });
    }
  },
];

export default validateUpdateUser;
