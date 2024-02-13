import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { Cocktail } from '@app/types';

const modulo = (number: number, modulus: number) => {
  return ((number % modulus) + modulus) % modulus;
};

function getClassName(itemIndex: number) {
  switch (itemIndex) {
    case 0: {
      return 'card border-dark absolute bg-card-green h-[336px] w-[288px] rounded-sm border-[3px]';
    }
    case 1: {
      return 'border-dark bg-card-pink absolute h-[336px] w-[288px] rotate-6 rounded-sm border-[3px]';
    }
    case 2: {
      return 'border-dark bg-pastel-yellow absolute h-[336px] w-[288px] -rotate-6 rounded-sm border-[3px]';
    }
    default: {
      return 'hidden';
    }
  }
}

export default function Carousel({
  similarCocktails,
}: {
  readonly similarCocktails: Cocktail[];
}) {
  const [index, setIndex] = useState(0);

  const handlePrevious = () => {
    setIndex((currentIndex) =>
      modulo(currentIndex - 1, similarCocktails.length),
    );
  };

  const handleNext = () => {
    setIndex((currentIndex) =>
      modulo(currentIndex + 1, similarCocktails.length),
    );
  };

  return (
    <>
      <button
        type='button'
        className='xs:-left-[5rem] absolute top-[10rem] z-10 h-10 w-10'
        onClick={handlePrevious}
      >
        <ChevronLeft className='h-10 w-10 cursor-pointer' />
      </button>
      {similarCocktails.map((cocktail, itemIndex) => (
        <div
          key={cocktail.id}
          className={`${getClassName(itemIndex)} ${
            itemIndex === index ? 'z-10' : 'z-0'
          }`}
        >
          {itemIndex === index && (
            <Link to={`/details/${cocktail.id}`}>
              <div>
                <img
                  src={cocktail.image || '/placeholder-cocktail.webp'}
                  alt={cocktail.name}
                  className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
                />
                <div>
                  <div className='mx-4 mt-3 text-center'>
                    <h1 className='font-stroke text-light text-md pb-2 normal-case'>
                      {cocktail.name}
                    </h1>
                  </div>
                  <div className='flex justify-center'>
                    {Number(cocktail.ratings_average) === 0 ? (
                      <p className='text-sm font-extralight'>
                        {'not grade yet'}
                      </p>
                    ) : (
                      [1, 2, 3, 4, 5].map((index) => (
                        <div
                          key={index}
                          className={`h-[30px] w-[30px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat ${
                            index <=
                            Math.floor(Number(cocktail.ratings_average) / 2)
                              ? 'grayscale-0 '
                              : 'grayscale'
                          }`}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      ))}
      <button
        type='button'
        className='absolute left-[20rem] top-[10rem] z-10 h-10 w-10'
        onClick={handleNext}
      >
        <ChevronRight className='h-10 w-10 cursor-pointer' />
      </button>
    </>
  );
}
