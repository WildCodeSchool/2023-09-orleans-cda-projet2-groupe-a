import React from 'react';
import { useState } from 'react';
import { type FieldValues, FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import FormActivity from '@/components/Forms/FormActivity';
import FormAge from '@/components/Forms/FormAge';
import FormAlim from '@/components/Forms/FormAlim';
import FormAllerg from '@/components/Forms/FormAllerg';
import FormContainer from '@/components/Forms/FormContainer';
import FormExpo from '@/components/Forms/FormExpo';
import FormObjo from '@/components/Forms/FormObjo';
import FormProblemsSkin from '@/components/Forms/FormProblemsSkin';
import FormRoutine from '@/components/Forms/FormRoutine';
import FormSensibility from '@/components/Forms/FormSensibility';
import FormSkin from '@/components/Forms/FormSkin';
import FormTabac from '@/components/Forms/FormTabac';
import FormTraitement from '@/components/Forms/FormTraitement';
import FormTypeSkin from '@/components/Forms/FormTypeSkin';

const PAGES = [
  { currentPage: 0, component: <FormSkin /> },
  { currentPage: 1, component: <FormTypeSkin /> },
  { currentPage: 2, component: <FormProblemsSkin /> },
  { currentPage: 3, component: <FormSensibility /> },
  { currentPage: 4, component: <FormRoutine /> },
  { currentPage: 5, component: <FormExpo /> },
  { currentPage: 6, component: <FormAlim /> },
  { currentPage: 7, component: <FormActivity /> },
  { currentPage: 8, component: <FormAge /> },
  { currentPage: 9, component: <FormTabac /> },
  { currentPage: 10, component: <FormAllerg /> },
  { currentPage: 11, component: <FormTraitement /> },
  { currentPage: 12, component: <FormExpo /> },
  { currentPage: 13, component: <FormObjo /> },
];
export default function Inscription() {
  const methods = useForm();
  const { handleSubmit, getValues } = methods;
  const [page, setPage] = useState(0);
  const formSubmit = async (data: FieldValues) => {
    console.log(getValues());

    try {
      setPage((curr) => curr + 1);

      await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error(`${String(error)}`);
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
