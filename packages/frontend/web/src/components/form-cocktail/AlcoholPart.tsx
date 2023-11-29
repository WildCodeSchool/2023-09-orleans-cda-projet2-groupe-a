import type { UseFormWatch } from 'react-hook-form';

import type { Inputs } from '@app/types';

export default function AlcoholPart({
  isOpen,
  handleClickSelect,
  handleClickAlcohol,
  watch,
}: {
  readonly isOpen: boolean;
  readonly handleClickSelect: () => void;
  readonly handleClickAlcohol: (alcohol: string) => void;
  readonly watch: UseFormWatch<Inputs>;
}) {
  return (
    <>
      <label className='relative bottom-[7%] w-[250px] text-center text-xl uppercase sm:bottom-[17%] sm:w-[300px] sm:text-2xl'>
        {'Choose your booze'}
      </label>
      <div className='relative bottom-[5%] left-[-7%] flex gap-3 sm:bottom-[12%] sm:left-[0%]'>
        <img
          src='form-cocktail/arrow-yellow.png'
          className={`hover:cursor-pointer ${
            isOpen ? 'relative right-[104%]' : ''
          }`}
          alt=''
          onClick={() => {
            handleClickSelect();
          }}
        />
        <div>
          {isOpen ? (
            <ul className='absolute bottom-[-100px] left-[-10%] h-[250px] w-[125px] overflow-y-scroll bg-white p-1 sm:bottom-[-122px] md:h-[150px]'>
              <li
                className='w-[100px] hover:cursor-pointer'
                onClick={() => {
                  handleClickSelect();
                }}
              >
                {'Alcohol'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('gin');
                }}
              >
                {'Gin'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('vodka');
                }}
              >
                {'Vodka'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('tequila');
                }}
              >
                {'Tequila'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('cider');
                }}
              >
                {'Cider'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('apple juice');
                }}
              >
                {'Appel Juice'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('amaretto');
                }}
              >
                {'Amaretto'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('wine');
                }}
              >
                {'Wine'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('soho');
                }}
              >
                {'Soho'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('white wine');
                }}
              >
                {'White wine'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('red wine');
                }}
              >
                {'Red wine'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('beer');
                }}
              >
                {'Beer'}
              </li>
              <li
                className='w-[100px]  hover:cursor-pointer'
                onClick={() => {
                  handleClickAlcohol('rum');
                }}
              >
                {'Rum'}
              </li>
            </ul>
          ) : (
            <ul>
              <li
                className='relative bottom-[-10px] w-[100px] hover:cursor-pointer'
                onClick={() => {
                  handleClickSelect();
                }}
              >
                {watch('alcohol') ?? 'Alcohol'}
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
