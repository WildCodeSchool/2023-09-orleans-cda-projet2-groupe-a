import React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import FormContainer from '@/components/Forms/FormContainer';
import FormSkin from '@/components/Forms/FormSkin';

const PAGES = [{ currentPage: 0, component: <FormSkin /> }];
export default function Inscription() {
  const methods = useForm();
  const { handleSubmit, getValues } = methods;
  const [page, setPage] = useState(0);

  const formSubmit = async (data) => {
    console.log(getValues());
    
    if (page < 10) {
      setPage((curr) => curr + 1);
    } else {
      try {
        //
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
              <Button type='submit'>
                {'Next'}
              </Button>
            </div>
          </FormContainer>
        </div>
      </form>
    </FormProvider>
  );
}
