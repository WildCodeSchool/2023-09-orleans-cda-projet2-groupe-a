import { useState } from 'react';

interface FavoriteHeartProps {
  readonly id: number;
  readonly isFavorite: number | undefined;
}

export default function FavoriteHeart({ id, isFavorite }: FavoriteHeartProps) {
  const [clickedCocktails, setClickedCocktails] = useState<
    Record<number, boolean>
  >({});

  const toggleFavorites = async (id: number) => {
    try {
      const response = await fetch(`/api/favorite/${id}/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseBody = await response.json();
      if (responseBody.ok === true) {
        setClickedCocktails({
          ...clickedCocktails,
          [id]: responseBody.message === 'add' ? true : false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <img
      src={'/heart.png'}
      alt='heart'
      className={`${
        (clickedCocktails[id] === undefined && isFavorite === 1) ||
        clickedCocktails[id]
          ? 'grayscale-0'
          : 'grayscale'
      } absolute bottom-[0px] right-[5px] h-[40px] w-[40px]`}
      onClick={async (event) => {
        event.preventDefault();
        await toggleFavorites(id);
      }}
    />
  );
}
