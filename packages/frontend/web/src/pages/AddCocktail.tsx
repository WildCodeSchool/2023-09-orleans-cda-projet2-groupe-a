import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { Inputs } from '@app/types';

import AlcoholPart from '@/components/form-cocktail/AlcoholPart';
import GlassPart from '@/components/form-cocktail/GlassPart';
import IngredientsPart from '@/components/form-cocktail/IngredientsPart';
import LevelPart from '@/components/form-cocktail/LevelPart';
import NamePart from '@/components/form-cocktail/NamePart';
import ToppingPart from '@/components/form-cocktail/ToppingPart';

const onSubmit: SubmitHandler<Inputs> = (data) => {
  return data;
};

export default function AddCocktail() {
  const [level, setLevel] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  const [selectedTopping, setSelectedTopping] = useState<string>('');

  const handleIngredientChange = (value: string) => {
    setSelectedIngredient(value);
  };
  const handleToppingChange = (value: string) => {
    setSelectedTopping(value);
  };

  const { register, handleSubmit, setValue, watch } = useForm<Inputs>();

  const handleClick = (number: number) => {
    if (number === level) {
      setLevel(0);
    } else {
      setLevel(number);
      setValue('level', number);
    }
  };

  const handleClickAlcohol = (alcohol: string) => {
    setValue('alcohol', alcohol);
    setIsOpen(!isOpen);
  };

  const handleClickSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form className='flex justify-center' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid w-screen grid-flow-col grid-rows-6 gap-1 gap-y-2 md:h-screen md:grid-rows-3 md:p-3 lg:grid-rows-2'>
        <div className='bg-dark lg:clip-path-polygon-purple-lg md:clip-path-polygon-purple-md md z-0 order-1 h-screen w-full md:h-full md:w-[128%] lg:w-[110%]'>
          <div className='lg:clip-path-polygon-purple-lg md:clip-path-polygon-purple-md z-0 h-screen w-full bg-transparent md:h-full md:p-2 md:pe-2.5'>
            <div className='bg-dark-purple lg:clip-path-polygon-purple-lg md:clip-path-polygon-purple-md z-0 h-screen w-full border-[10px] md:h-full md:border-none'>
              <div className=" flex h-screen w-full items-center justify-center bg-center bg-no-repeat md:h-full md:bg-[url('form-cocktail/polygon/polygon-purple.png')]">
                <div className="flex h-screen w-[95%] flex-col items-center justify-center bg-[url('form-cocktail/bubble/bubble1.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto">
                  <LevelPart level={level} handleClick={handleClick} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-dark lg:clip-path-polygon-orange-lg md:clip-path-polygon-orange-md order-4 h-screen w-full md:order-3 md:h-full md:w-[120%] lg:order-2 lg:w-[110%]'>
          <div className='lg:clip-path-polygon-orange-lg md:clip-path-polygon-orange-md h-screen w-full bg-transparent md:h-full md:p-2 md:pe-2.5'>
            <div className='bg-dark-orange lg:clip-path-polygon-orange-lg md:clip-path-polygon-orange-md h-screen w-full border-[10px] md:h-full md:border-none'>
              <div className="flex h-screen w-full items-center justify-center bg-center bg-no-repeat md:h-full md:bg-[url('form-cocktail/polygon/polygon-orange.png')]">
                <div className="flex h-screen w-[95%] flex-col items-center justify-center bg-[url('form-cocktail/bubble/bubble2.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto">
                  <GlassPart register={register} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-dark lg:clip-path-polygon-yellow-lg md:clip-path-polygon-yellow-md relative order-2 h-screen md:right-[-7%] md:order-5 md:h-full md:w-[93%] lg:right-[15%] lg:order-3 lg:w-[130%]'>
          <div className='lg:clip-path-polygon-yellow-lg md:clip-path-polygon-yellow-md  h-screen w-full bg-transparent md:h-full md:p-2 md:px-2.5'>
            <div className='bg-dark-yellow lg:clip-path-polygon-yellow-lg md:clip-path-polygon-yellow-md  h-screen w-full border-[10px] md:h-full md:border-none'>
              <div className="flex h-screen w-full items-center justify-center bg-center bg-no-repeat md:h-full md:bg-[url('form-cocktail/polygon/polygon-yellow.png')]">
                <div className="flex h-screen w-[95%] flex-col items-center justify-center bg-[url('form-cocktail/bubble/bubble3.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto">
                  <AlcoholPart
                    isOpen={isOpen}
                    handleClickSelect={handleClickSelect}
                    handleClickAlcohol={handleClickAlcohol}
                    watch={watch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-dark lg:clip-path-polygon-green-lg md:clip-path-polygon-green-md order-5 h-screen md:order-2 md:h-full md:w-[127%] lg:order-4 lg:w-full'>
          <div className='lg:clip-path-polygon-green-lg md:clip-path-polygon-green-md  h-screen w-full bg-transparent md:h-full md:p-2 md:px-2.5'>
            <div className='bg-dark-green lg:clip-path-polygon-green-lg md:clip-path-polygon-green-md  h-screen w-full border-[10px] md:h-full md:border-none'>
              <div className="flex h-screen w-full items-center justify-center bg-center bg-no-repeat md:h-full md:bg-[url('form-cocktail/polygon/polygon-green.png')]">
                <div className="flex h-screen w-[95%] flex-col items-center justify-center bg-[url('form-cocktail/bubble/bubble4.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto">
                  <ToppingPart
                    register={register}
                    selectedTopping={selectedTopping}
                    handleToppingChange={handleToppingChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-dark  lg:clip-path-polygon-blue-lg md:clip-path-polygon-blue-md relative order-3 h-screen md:right-[-2%] md:order-4 md:h-full md:w-[98%] lg:right-[8%] lg:order-5 lg:w-[108%]'>
          <div className=' lg:clip-path-polygon-blue-lg md:clip-path-polygon-blue-md h-screen w-full bg-transparent md:h-full md:p-2 md:ps-2.5'>
            <div className='bg-dark-blue  lg:clip-path-polygon-blue-lg md:clip-path-polygon-blue-md h-screen w-full border-[10px] md:h-full md:border-none'>
              <div className="flex h-screen w-full items-center justify-center bg-center bg-no-repeat md:h-full md:bg-[url('form-cocktail/polygon/polygon-blue.png')]">
                <div className="flex h-screen w-[95%] flex-col items-center justify-center bg-[url('form-cocktail/bubble/bubble5.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto">
                  <IngredientsPart
                    register={register}
                    selectedIngredient={selectedIngredient}
                    handleIngredientChange={handleIngredientChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-dark lg:clip-path-polygon-pink-lg md:clip-path-polygon-pink-md relative order-6 h-screen md:right-[-7%] md:h-full md:w-[93%] lg:right-[8%] lg:w-[108%]'>
          <div className='lg:clip-path-polygon-pink-lg md:clip-path-polygon-pink-md h-screen w-full bg-transparent md:h-full md:p-2 md:ps-2.5'>
            <div className='bg-dark-pink lg:clip-path-polygon-pink-lg md:clip-path-polygon-pink-md h-screen w-full border-[10px] md:h-full md:border-none'>
              <div className="flex h-screen w-full items-center justify-center bg-center bg-no-repeat md:h-full md:bg-[url('form-cocktail/polygon/polygon-pink.png')]">
                <div className="flex h-screen w-[95%] flex-col items-center justify-center bg-[url('form-cocktail/bubble/bubble6.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto">
                  <NamePart register={register} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
