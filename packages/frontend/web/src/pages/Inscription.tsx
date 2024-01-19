import React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import FormContainer from '@/components/Forms/FormContainer';
import FormProblemsSkin from '@/components/Forms/FormProblemsSkin';
import FormRoutine from '@/components/Forms/FormRoutine';
import FormSensibility from '@/components/Forms/FormSensibility';
import FormSkin from '@/components/Forms/FormSkin';
import FormTypeSkin from '@/components/Forms/FormTypeSkin';

const PAGES = [
  { currentPage: 0, component: <FormSkin /> },
  { currentPage: 1, component: <FormTypeSkin /> },
  { currentPage: 2, component: <FormProblemsSkin /> },
  { currentPage: 3, component: <FormSensibility /> },
  { currentPage: 4, component: <FormRoutine /> },
];

export default function Inscription() {
  const methods = useForm();
  const { handleSubmit, getValues } = methods;
  const [page, setPage] = useState(0);

  const formSubmit = async () => {
    console.log(getValues());

    if (page < 10) {
      setPage((curr) => curr + 1);
    } else {
      try {
        // Suppose you have an async function named `asyncOperation`
        await asyncOperation();
      } catch (error) {
        throw new Error(`${String(error)}`);
      }
    }
  };

  console.log(page);

  return (
    <FormProvider {...methods}>
      <form className='w-full' onSubmit={handleSubmit(formSubmit)}>
        <div className='flex h-full w-full flex-col justify-between'>
          <FormContainer page={page}>
            {PAGES.map(
              ({ currentPage, component }) =>
                currentPage === page && (
                  <React.Fragment key={currentPage}>{component}</React.Fragment>
                ),
            )}
            <div className='flex justify-end'>
              <Button type='submit'>{'Next'}</Button>
            </div>
          </FormContainer>
        </div>
      </form>
    </FormProvider>
  );
}
