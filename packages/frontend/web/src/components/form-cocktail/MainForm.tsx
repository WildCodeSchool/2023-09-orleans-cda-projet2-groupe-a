import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { CocktailForm, Ingredient, Topping } from '@app/types';

import GetSquares from './GetSquares';

interface MainFormProps {
  readonly setIsModalShown: (isModalShown: boolean) => void;
  readonly setActualIngredient: (actualIngredient: number) => void;
  readonly actualIngredient: number;
}

export default function MainForm({
  setIsModalShown,
  setActualIngredient,
  actualIngredient,
}: MainFormProps) {
  const { watch, setValue, clearErrors, setError, handleSubmit } =
    useFormContext();
  const [withAlcohol, setWithAlcohol] = useState(true);

  const [level, setLevel] = useState<number>(0);
  const [show, setShow] = useState<number>(1);

  const [selectedAlcohol, setSelectedAlcohol] = useState<Ingredient | null>(
    null,
  );

  const [selectedTopping, setSelectedTopping] = useState<Topping | undefined>();

  const [selectedAlcohols, setSelectedAlcohols] = useState<Ingredient[]>([]);

  const navigate = useNavigate();

  const handleToppingChange = (value: Topping) => {
    setSelectedTopping(value);
    show < 6 ? setShow(6) : null;
    setValue('topping', value);
    setShow(6);
  };
  const handleLevelClick = async (selectedLevel: number) => {
    try {
      const response = await fetch(`/api/alcohol/${selectedLevel}`);

      const result = await response.json();

      setSelectedAlcohols(result);
      if (selectedLevel !== level) {
        setLevel(selectedLevel);
        setValue('level', selectedLevel);
        show < 2 ? setShow(2) : null;
      }
    } catch (error) {
      console.error(
        'Une erreur est survenue lors de la récupération des alcools',
        error,
      );
    }
  };

  const handleClickAlcohol = (alcohol: Ingredient) => {
    show < 3 ? setShow(3) : null;
    setSelectedAlcohol(alcohol);
    setValue('alcohol', alcohol);
  };

  const handleClickSoftDrinks = (softDrink: Ingredient) => {
    show < 3 ? setShow(3) : null;
    setValue('softDrink', softDrink);
  };

  const handleClickSyrup = (syrup: Ingredient | null) => {
    show < 3 ? setShow(3) : null;
    syrup === null ? setValue('syrup', null) : setValue('syrup', syrup);
  };

  const handleErrorSubmit = () => {
    const alcoholValue = watch('alcohol');
    const softDrinkValue = watch('softDrink');

    if (alcoholValue === undefined && softDrinkValue === undefined) {
      setError('alcohol', { type: 'required', message: 'required' });
      setError('softDrink', { type: 'required', message: 'required' });
    } else if (
      (alcoholValue !== undefined &&
        typeof alcoholValue.name === 'string' &&
        alcoholValue.name.length <= 255) ||
      (softDrinkValue !== undefined &&
        typeof softDrinkValue.name === 'string' &&
        softDrinkValue.name.length <= 255)
    ) {
      clearErrors('alcohol');
      clearErrors('softDrink');
    } else {
      setError('alcohol', {
        type: 'validate',
        message: 'must be a string of 255 characters max',
      });
      setError('softDrink', {
        type: 'validate',
        message: 'must be a string of 255 characters max',
      });
    }

    const levelValue = watch('level');

    if (levelValue === undefined && softDrinkValue === undefined) {
      setError('level', { type: 'required', message: 'required' });
    } else if (
      (typeof levelValue === 'number' && levelValue <= 3 && levelValue >= 1) ||
      softDrinkValue !== undefined
    ) {
      clearErrors('level');
    } else {
      setError('level', {
        type: 'validate',
        message: 'must be a number between 1 and 3',
      });
    }

    const ingredientsValue = watch('ingredients');

    if (ingredientsValue === undefined) {
      setError('ingredients', {
        type: 'required',
        message: 'required',
      });
    } else {
      clearErrors('ingredients');
    }

    const glassValue = watch('glass');

    if (glassValue === undefined) {
      setError('glass', { type: 'required', message: 'required' });
    } else if (typeof glassValue.id === 'number') {
      clearErrors('glass');
    } else {
      setError('glass', {
        type: 'validate',
        message: 'must be a number',
      });
    }
  };
  const onSubmit = async (data: CocktailForm) => {
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
        navigate(`/details/${cocktailId}`);
      } else if (responseBody.message === 'not connected') {
        navigate(`/login`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form className='flex justify-center' onSubmit={handleSubmit(onSubmit)}>
      <GetSquares
        withAlcohol={withAlcohol}
        setShow={setShow}
        setIsModalShown={setIsModalShown}
        actualIngredient={actualIngredient}
        setActualIngredient={setActualIngredient}
        selectedTopping={selectedTopping}
        selectedAlcohol={selectedAlcohol}
        handleToppingChange={handleToppingChange}
        handleErrorSubmit={handleErrorSubmit}
        level={level}
        handleLevelClick={handleLevelClick}
        setWithAlcohol={setWithAlcohol}
        selectedAlcohols={selectedAlcohols}
        handleClickAlcohol={handleClickAlcohol}
        handleClickSoftDrinks={handleClickSoftDrinks}
        handleClickSyrup={handleClickSyrup}
        show={show}
      />
    </form>
  );
}
