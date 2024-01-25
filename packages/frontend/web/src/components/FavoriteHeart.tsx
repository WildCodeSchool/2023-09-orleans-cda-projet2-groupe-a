import { useState } from 'react';

interface FavoriteHeartProps {
  readonly id: number;
  readonly isFavorite: number;
}

export default function FavoriteHeart({ id, isFavorite }: FavoriteHeartProps) {
  const [clickedCocktails, setClickedCocktails] = useState<
    Record<number, boolean>
  >({});

  const removeFavorites = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/favorite/add/${id}}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );
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
        (clickedCocktails[id] && isFavorite === 0) ||
        (isFavorite === 1 && clickedCocktails[id] === undefined) ||
        (clickedCocktails[id] && isFavorite === 1)
          ? 'grayscale-0'
          : 'grayscale'
      } absolute bottom-[0px] right-[5px] h-[40px] w-[40px]`}
      onClick={async (event) => {
        event.preventDefault();
        await removeFavorites(id);
      }}
    />
  );
}
