// Utility function to find similar cocktails
import type { Cocktail, Ingredient } from '@app/types';

interface SimilarCocktailProps {
  readonly targetCocktail: Cocktail;
  readonly allCocktails: Cocktail[];
}

export default function SimilarCocktail({
  targetCocktail,
  allCocktails,
}: SimilarCocktailProps) {
  const suggestions = findSimilarCocktails(targetCocktail, allCocktails);

  return (
    <div>
      {suggestions.map((cocktail) => (
        <div key={cocktail.id}>
          {/* Display the cocktail information here */}
          <p>{cocktail.name}</p>
          {/* Add more cocktail details as needed */}
        </div>
      ))}
    </div>
  );
}
