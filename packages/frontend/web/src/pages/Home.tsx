import { Link } from 'react-router-dom';

import CocktailsPart from '@/components/home/CocktailsPart';
import CommunityPart from '@/components/home/CommunityPart';
import FavoritesPart from '@/components/home/FavoritesPart';
import ProfilePart from '@/components/home/ProfilePart';
import ShakeItPart from '@/components/home/ShakeItPart';
import VirginPart from '@/components/home/VirginPart';

import LegalNotice from './LegalModal';

const squares = [
  {
    color: 'pink',
    order: {
      all: 1,
    },
    biasSide: {
      all: ['right'],
      md: ['right'],
      lg: ['right'],
    },
    width: {
      all: 105,
      md: 105,
      lg: 110,
    },

    component: (
      <Link to='/community'>
        <CommunityPart />
      </Link>
    ),
  },
  {
    color: 'pink',
    order: {
      all: 2,
      lg: 3,
    },
    biasSide: {
      all: ['left'],
      md: ['left'],
      lg: ['right', 'left'],
    },
    width: {
      all: 105,
      md: 105,
      lg: 130,
    },
    right: {
      all: 0,
      md: 0,
      lg: 15,
    },
    component: (
      <Link to='/shaker'>
        <ShakeItPart />
      </Link>
    ),
  },
  {
    color: 'pink',
    order: {
      all: 4,
      lg: 5,
    },
    biasSide: {
      all: ['left'],
      md: ['left'],
      lg: ['left'],
    },
    width: {
      all: 108,
      md: 116,
      lg: 108,
    },
    right: {
      all: 8,
      md: 16,
      lg: 8,
    },
    component: (
      <Link to='/profile'>
        <ProfilePart />
      </Link>
    ),
  },
  {
    color: 'pink',
    order: {
      all: 3,
      lg: 2,
    },
    biasSide: {
      all: ['right'],
      md: ['right'],
      lg: ['right'],
    },
    width: {
      all: 105,
      md: 105,
      lg: 110,
    },

    component: (
      <Link to='/virgin'>
        <VirginPart />
      </Link>
    ),
  },
  {
    color: 'pink',
    order: {
      all: 5,
      lg: 4,
    },
    biasSide: {
      all: ['right'],
      md: ['right'],
      lg: ['right', 'left'],
    },
    width: {
      all: 108,
      md: 110,
      lg: 103,
    },
    right: {
      all: 8,
      md: 10,
      lg: 0,
    },

    component: (
      <Link to='/cocktails'>
        <CocktailsPart />
      </Link>
    ),
  },
  {
    color: 'pink',
    order: {
      all: '6',
      lg: '6',
    },
    biasSide: {
      all: ['left'],
      md: ['left'],
      lg: ['left'],
    },
    width: {
      all: 113,
      md: 105,
      lg: 104,
    },
    right: {
      all: 8,
      md: 5,
      lg: 4,
    },
    component: (
      <Link to='/favorites'>
        <FavoritesPart />
      </Link>
    ),
  },
];

export default function Home() {
  return (
    <div className='relative overflow-x-hidden'>
      <form
        className='flex h-screen w-screen justify-center'
        onSubmit={undefined}
      >
        <div className='grid h-full w-full grid-flow-col grid-rows-3 gap-y-2 p-1 md:p-3 lg:grid-rows-2'>
          {squares.map((square) => (
            <div
              key={square.color}
              className={`bg-dark relative clip-path-polygon-${
                square.color
              } md:clip-path-polygon-${square.color}-md lg:clip-path-polygon-${
                square.color
              }-lg order-${square.order.all} lg:order-${
                square.order.lg
              } h-full w-[${square.width.all}%] md:w-[${
                square.width.md
              }%] lg:w-[${square.width.lg}%] ${
                square.right === undefined
                  ? ''
                  : `right-[${square.right.all}%] md:right-[${square.right.md}%] lg:right-[${square.right.lg}%]`
              }`}
            >
              <div
                className={`lg:clip-path-polygon-${
                  square.color
                }-lg clip-path-polygon-${square.color} md:clip-path-polygon-${
                  square.color
                }-md h-full w-full bg-transparent p-2 md:h-full ${
                  square.biasSide.md.includes('left') ? 'ps-2.5' : ''
                } ${square.biasSide.md.includes('right') ? 'pe-2.5' : ''} ${
                  square.biasSide.lg.includes('left') ? 'lg:ps-2.5' : ''
                } ${square.biasSide.lg.includes('right') ? 'lg:pe-2.5' : ''}`}
              >
                <div
                  className={`bg-dark-${square.color} lg:clip-path-polygon-${square.color}-lg clip-path-polygon-${square.color} md:clip-path-polygon-${square.color}-md relative h-full w-full md:h-full`}
                >
                  <div
                    className={`filter-black-to-${square.color} flex h-full w-full items-center justify-center bg-[url('polygon-black.png')] bg-cover bg-center bg-no-repeat`}
                  />
                  {square.color === 'blue' ? (
                    <div
                      className={` absolute left-[14%] top-0 flex h-full w-[80%] flex-col items-center justify-center bg-contain bg-center bg-no-repeat sm:left-[20%] sm:w-[60%] md:left-[8%] md:w-[80%] md:bg-auto lg:left-[8%] lg:top-[10%] lg:w-[80%]`}
                    >
                      {square.component}
                    </div>
                  ) : (
                    <div
                      className={`absolute left-[8%] top-0 flex h-full w-[80%] flex-col items-center justify-center bg-contain  bg-center bg-no-repeat sm:left-[20%] sm:w-[60%] md:left-[8%] md:w-[80%] md:bg-auto lg:left-[8%] lg:w-[80%]`}
                    >
                      {square.component}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
      <div className='z40 absolute top-0 bg-black bg-opacity-60 shadow-inner'>
        <LegalNotice />
      </div>
    </div>
  );
}
