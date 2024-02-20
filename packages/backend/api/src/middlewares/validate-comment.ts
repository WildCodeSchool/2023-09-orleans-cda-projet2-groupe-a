import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateComment = [
  body('score')
    .exists()
    .withMessage('score is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('score must be between 1 to 5'),
  body('content')
    .exists()
    .withMessage('content is required')
    .isString()
    .withMessage('content must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('content must be between 1 and 255 characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ validationErrors: errors.array() });
    }
  },
];

export default validateComment;
