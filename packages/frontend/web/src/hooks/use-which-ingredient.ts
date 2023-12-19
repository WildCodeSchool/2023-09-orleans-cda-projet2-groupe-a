import { useState } from 'react';

import type { CocktailForm } from '@app/types';

export default function useWichIngredient(
  ingredient: string = 'nothing',
): keyof CocktailForm | null {
  const [nextIngredient, setNextIngredient] = useState<
    keyof CocktailForm | null
  >(null);
  switch (ingredient) {
    case 'nothing': {
      break;
    }
    case 'alcohol': {
      setNextIngredient('ingredient1');
      break;
    }
    case 'ingredient1': {
      setNextIngredient('ingredient2');
      break;
    }
    case 'ingredient2': {
      setNextIngredient('ingredient3');
      break;
    }
    case 'ingredient3': {
      setNextIngredient(null);
    }
  }
  return nextIngredient;
}
