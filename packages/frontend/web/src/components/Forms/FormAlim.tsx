import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Criter {
  id: number;
  criteria_name: string;
}

interface Category {
  category_name: string;
  criters: Criter[];
}

export default function FormAlim() {
  const { register, watch, setValue } = useFormContext();
  const [item, setItem] = useState<Category>();

  const selectItem = watch('criteria_value_id');

  const handleClick = () => {
    setValue('criteria_value_id', selectItem);
  };

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/criteria`, {
        signal: controller.signal,
      });

      const data = await response.json();
      setItem(data[6]);
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1 className='text-secondary font-base mt-5 text-2xl lg:text-3xl'>
        {item?.category_name}
      </h1>
      <div className='flex flex-col justify-center gap-8 pt-20'>
        {item?.criters.map((criter: Criter) => (
          <div className='flex items-center justify-center' key={criter.id}>
            <label
              onClick={handleClick}
              htmlFor={String(criter.id)}
              className={`border-gold hover:bg-secondary hover:text-primary flex w-[70%] cursor-pointer items-center justify-center border py-3 text-xl tracking-widest ${selectItem === String(criter.id) ? 'bg-secondary text-primary' : ''}`}
            >
              {criter.criteria_name}
            </label>
            <input
              className='opacity-0'
              type='radio'
              id={String(criter.id)}
              /* name={item.category_name} */
              {...register('criteria_value_id')}
              value={criter.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
