import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { CocktailForm } from '@app/types';

import Shaker from '@/components/Shaker';
import MainForm from '@/components/form-cocktail/MainForm';
import ModalSearch from '@/components/form-cocktail/ModalSearch';

export default function AddCocktail() {
  const methods = useForm<CocktailForm>();
  const [isModalShown, setIsModalShown] = useState(false);
  const [actualIngredient, setActualIngredient] = useState(0);
  const [isShake, setIsShake] = useState(false);

  return (
    <FormProvider {...methods}>
      {!isShake && (
        <div className='absolute top-0 z-[100] bg-black bg-opacity-60 shadow-lg'>
          <Shaker />
        </div>
      )}
      <MainForm
        setIsModalShown={setIsModalShown}
        setActualIngredient={setActualIngredient}
        actualIngredient={actualIngredient}
        setIsShake={setIsShake}
      />

      {isModalShown ? (
        <div className='relative'>
          <ModalSearch
            setIsModalShown={setIsModalShown}
            actualIngredient={actualIngredient}
            setActualIngredient={setActualIngredient}
          />
        </div>
      ) : null}
    </FormProvider>
  );
}
