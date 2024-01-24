import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateUpdateUser = [
  body('color')
    .trim()
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
      if (value === '') {
        return true;
      }
      if (!validColors.includes(value)) {
        throw new Error('Color must be one of the proposed choices');
      }
      return true;
    }),
  body('pseudo')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 60 }),
  body('image').trim().isLength({ max: 255 }),
  body('currentPassword')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 255 }),
  body('newPassword')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 255 }),
  body('confirmNewPassword')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 255 }),
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
