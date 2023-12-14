import { useState } from 'react';

export default function LegalNotice() {
  const [isModalShown, setIsModalShown] = useState(false);

  return isModalShown ? (
    <div className='flex-end font-stroke text-light flex items-center'>
      <div className='z-40 flex h-1/6 flex-col items-center gap-6 text-4xl'>
        <div className='hover:text-dark-orange hover:bg-light-yellow m-2 rounded-[30px] border-black p-4 text-6xl font-bold transition-transform  duration-500 ease-in-out hover:rotate-1 hover:scale-110 hover:justify-normal hover:border-[5px] hover:bg-opacity-80'>
          <a href='/virgin'>{'Legal Notice'}</a>
        </div>
        <img
          className='shadow-2x1 z-50 h-2/3 w-2/3 justify-center rounded-[90px] border-[6px] border-black object-center opacity-100 shadow-inner'
          src='./alcohol-free-cocktails.webp'
          alt='redirection page for under18'
        />
        <button
          type='button'
          className='font-stroke text-light hover:text-dark-orange duration-250 flex h-[10px] w-[10px] justify-end transition-transform ease-in-out hover:scale-110'
          onClick={() => {
            setIsModalShown(false);
          }}
        >
          <div className=''>{'X'}</div>
        </button>
      </div>
    </div>
  ) : null;
}
