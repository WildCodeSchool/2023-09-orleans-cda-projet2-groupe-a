import React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormSkin from '@/components/Forms/FormSkin';

const PAGES = [{ currentPage: 0, component: <FormSkin /> }];
export default function Inscription() {
  const methods = useForm();
  const [page, setPage] = useState(0);

  const handleClick = () => {
    setPage((curr) => curr + 1);
  };

  console.log(page);
  return (
    <FormProvider {...methods}>
      <form className='w-full'>
        <div className='flex h-full w-full flex-col justify-between bg-blue-700'>
          {PAGES.map(
            ({ currentPage, component }) =>
              currentPage === page && (
                <React.Fragment key={currentPage}>{component}</React.Fragment>
              ),
          )}
          <div className='flex w-full flex-col gap-6'>
            <button type='button' onClick={handleClick}>
              {' '}
              {'bouton'}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
