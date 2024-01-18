import { useEffect, useState } from 'react';

import FormContainer from './FormContainer';

interface Criter {
  id: number;
  criteria_name: string;
}

interface Category {
  category_name: string;
  criters: Criter[];
}

export default function FormSkin() {
  const [item, setItem] = useState<Category>();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/criteria`, {
        signal: controller.signal,
      });

      const data = await response.json();
      setItem(data[0]);
    })();

    return () => {
      controller.abort();
    };
  }, []);

  console.log(item);

  return (
    <FormContainer>
      <h1 className='text-primary font-title mb-4 text-2xl lg:text-3xl'>
        {item?.category_name}
      </h1>
      <div className='mt-10 flex flex-col gap-3'>
        {item?.criters.map((criter: Criter) => (
          <div className='flex items-center justify-center' key={criter.id}>
            <label
              htmlFor={String(criter.id)}
              className='border-primary hover:bg-primary hover:text-light-hard flex w-full cursor-pointer items-center justify-center rounded-lg border py-3 text-xl'
            >
              {criter.criteria_name}
            </label>
            <input
              className=''
              type='radio'
              id={String(criter.id)}
              name={item.category_name}
            />
          </div>
        ))}
      </div>
    </FormContainer>
  );
}
