import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import type { Ingredient } from '@app/types';

const validateCocktailAdd = [
  body('ingredients')
    .exists()
    .withMessage('ingredients is required')
    .isArray({ min: 3, max: 3 })
    .withMessage('Cocktail must contain exactly 3 ingredients')
    .custom((ingredients: Ingredient[]) => {
      return ingredients.every((ingredient) => {
        return (
          typeof ingredient === 'object' &&
          ingredient !== null &&
          'id' in ingredient &&
          'flavour' in ingredient &&
          'name' in ingredient &&
          'kcal' in ingredient &&
          'degree' in ingredient
        );
      });
    })
    .withMessage(
      'Each ingredient must be an object with id, flavour, name, and kcal properties',
    ),
  body('alcohol')
    .exists()
    .withMessage('Alcohol is required')
    .isObject()
    .withMessage('Alcohol must be an object')
    .custom((alcohol) => {
      return (
        'id' in alcohol &&
        'name' in alcohol &&
        'flavour' in alcohol &&
        'kcal' in alcohol &&
        'degree' in alcohol
      );
    })
    .withMessage(
      'Alcohol must be an object with id, name, flavour, kcal, and degree properties',
    ),
  body('glass')
    .exists()
    .withMessage('glass is required')
    .isObject()
    .withMessage('glass must be an object')
    .custom((glass) => {
      return 'id' in glass && 'name' in glass && 'capacity' in glass;
    })
    .withMessage(
      'glass must be an object with id, name, and capacity properties',
    ),
  body('topping')
    .exists()
    .withMessage('Topping is required')
    .isObject()
    .withMessage('Topping must be an object')
    .custom((topping) => {
      return 'id' in topping && 'name' in topping && 'flavour' in topping;
    })
    .withMessage(
      'topping must be an object with id, name, and flavour properties',
    ),
  body('name')
    .exists()
    .isLength({ max: 255 })
    .withMessage(
      'topping must be an object with id, name, and flavour properties',
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ validationErrors: errors.array() });
    }
  },
];

export default validateCocktailAdd;
