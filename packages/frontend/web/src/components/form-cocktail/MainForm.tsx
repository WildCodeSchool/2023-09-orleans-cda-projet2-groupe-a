import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSound } from 'use-sound';

import type { CocktailForm, Ingredient, Topping } from '@app/types';

import GetSquares from './GetSquares';
import sound from '/shake.mp3';

interface MainFormProps {
  readonly setIsModalShown: (isModalShown: boolean) => void;
  readonly setActualIngredient: (actualIngredient: number) => void;
  readonly actualIngredient: number;
  readonly setIsShake: (isShake: boolean) => void;
}

export default function MainForm({
  setIsModalShown,
  setActualIngredient,
  actualIngredient,
  setIsShake,
}: MainFormProps) {
  const { handleSubmit } = useFormContext();
  const [withAlcohol, setWithAlcohol] = useState(true);

  const [level, setLevel] = useState<number>(0);
  const [show, setShow] = useState<number>(1);

  const [selectedAlcohol, setSelectedAlcohol] = useState<Ingredient | null>(
    null,
  );

  const [selectedTopping, setSelectedTopping] = useState<Topping | undefined>();

  const [selectedAlcohols, setSelectedAlcohols] = useState<Ingredient[]>([]);

  const navigate = useNavigate();

  const [play, { stop }] = useSound(sound, { volume: 0.5 });

  const onSubmit = async (data: CocktailForm) => {
    setIsShake(true);
    play();
    try {
      const response = await fetch(`/api/cocktail/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseBody = await response.json();
      if (responseBody.ok === true) {
        const cocktailId = responseBody.cocktailId;

        setTimeout(() => {
          stop();
          navigate(`/details/${cocktailId}`);
        }, 3000);
      } else if (responseBody.message === 'not connected') {
        stop();
        navigate(`/login`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form
      className='flex justify-center overflow-hidden'
      onSubmit={handleSubmit(onSubmit)}
    >
      <GetSquares
        withAlcohol={withAlcohol}
        setShow={setShow}
        setIsModalShown={setIsModalShown}
        actualIngredient={actualIngredient}
        setActualIngredient={setActualIngredient}
        selectedTopping={selectedTopping}
        selectedAlcohol={selectedAlcohol}
        level={level}
        setWithAlcohol={setWithAlcohol}
        selectedAlcohols={selectedAlcohols}
        setSelectedAlcohol={setSelectedAlcohol}
        show={show}
        setLevel={setLevel}
        setSelectedAlcohols={setSelectedAlcohols}
        setSelectedTopping={setSelectedTopping}
      />
    </form>
  );
}
