import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { CocktailForm } from '@app/types';

import MainForm from '@/components/form-cocktail/MainForm';
import ModalSearch from '@/components/form-cocktail/ModalSearch';

export default function AddCocktail() {
  const methods = useForm<CocktailForm>();
  const [isModalShown, setIsModalShown] = useState(false);
  const [actualIngredient, setActualIngredient] = useState(0);

  return (
    <FormProvider {...methods}>
      <MainForm
        setIsModalShown={setIsModalShown}
        setActualIngredient={setActualIngredient}
        actualIngredient={actualIngredient}
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
