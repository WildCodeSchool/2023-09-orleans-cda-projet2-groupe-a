import { useEffect, useRef, useState } from 'react';

import type { Cocktail } from '@app/types';

type CarouselProps = {
  readonly cocktail: Cocktail;
};
export default function Carousel({
  cocktail,
}: {
  readonly cocktail: CarouselProps[];
}) {
  const [index, setIndex] = useState(0);

  // Next and previous buttons
  const handlePrevious = () => {
    if (index === 0) {
      setIndex(cocktail.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index === cocktail.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const module = (number: number) => {
    const result = number % cocktail.length;
    return result >= 0 ? result : result + cocktail.length;
  };

  const index1 = module(index - 1);
  const index2 = module(index + 1);
  const index3 = module(index + 2);

  function getClassName(index: number) {
    let className = '';

    switch (index) {
      case index: {
        className = 'card z-[99] scale-100';
        break;
      }
      case index1: {
        className = 'card z-[20] scale-[0.8] translate-x-[125%]';
        break;
      }
      case index2: {
        className = 'card z-[10] scale-[0.8] translate-x-[-125%]';
        break;
      }
      case index3: {
        className = 'card z-[10] scale-[0.8] translate-x-[-125%]';
        break;
      }
      default: {
        className = 'card';
        break;
      }
    }
  }
  return (
    <div>
      <p>{`coucou`}</p>
    </div>
  );
}
