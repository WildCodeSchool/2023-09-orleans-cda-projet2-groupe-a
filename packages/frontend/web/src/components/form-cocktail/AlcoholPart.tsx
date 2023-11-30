import type { AlcoholPart } from '@app/types/src/cocktail-form';

const alcoholArray = [
  'Gin',
  'Tequila',
  'Vodka',
  'Cider',
  'Amaretto',
  'Red wine',
  'White wine',
  'Peach wine',
  'Wisky',
  'Cognac',
  'Chmpagne',
];

export default function AlcoholPart({
  isOpen,
  handleClickSelect,
  handleClickAlcohol,
  watch,
}: AlcoholPart) {
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
              {alcoholArray.map((name) => (
                <li
                  key={name}
                  className='w-[100px] hover:cursor-pointer'
                  onClick={() => {
                    handleClickAlcohol(name);
                  }}
                >
                  {name}
                </li>
              ))}
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
