import { useState } from 'react';

const now: Date = new Date();
const developers = [
  {
    name: 'Jean-Antoine',
    linkedIn: 'https://www.linkedin.com/in/jaalazard/',
    github: 'https://github.com/jaalazard/',
    img1: './avatar/avatar-23.webp',
    img2: './jaapic.jpg',
  },
  {
    name: 'Noémie',
    linkedIn: 'https://www.linkedin.com/in/no%C3%A9mie-barre-3a2204272/',
    github: 'https://github.com/No3ml3',
    img1: './avatar/avatar-3.webp',
    img2: './noemiepic.jpg',
  },
  {
    name: 'Justine',
    linkedIn:
      'https://www.linkedin.com/in/justine-cl%C3%A9ment-savary-a62496272/',
    github: 'https://github.com/Justicesvr',
    img1: './avatar/avatar-8.webp',
    img2: './justinepic.jpg',
  },
  {
    name: 'Cédrick',
    linkedIn: 'https://www.linkedin.com/in/c%C3%A9drick-marie/',
    github: 'https://github.com/Cardamced',
    img1: './avatar/avatar-9.webp',
    img2: './cedpic.jpeg',
  },
];

export default function ShowTeam() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className='z-40 flex h-screen w-screen flex-col items-center gap-6 bg-blue-200 text-xl'>
      <div className='xs:text-3xl animate-color-pulse hover:bg-light-green font-stroke z-50 m-6 mt-[50px] rounded-[30px] border-[5px] border-transparent p-6 font-bold transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-110 hover:animate-none hover:justify-normal hover:border-[5px] hover:border-black hover:bg-opacity-80 hover:text-pink-400 sm:text-3xl'>
        <span>{'Proudly made with React by devoted devs'}</span>
      </div>
      <div className='xxs:grid xxs:mb-[100px] xxs:grid-cols-1 z-50 my-8 gap-x-[3rem] gap-y-[20rem] sm:grid-cols-2 md:gap-8 md:gap-y-[20rem] lg:grid-cols-4 lg:gap-8 lg:gap-y-[15rem]'>
        {developers.map((developer, index) => (
          <div key={index}>
            <div className='xxs:h-36 xxs:w-36 lg:h-48 lg:w-48 xl:h-64 xl:w-64'>
              <div
                className='relative h-full w-full'
                onMouseEnter={() => {
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                }}
              >
                <img
                  className={`border-light absolute h-full w-full transform rounded-full border-4 object-cover transition-transform duration-150 ease-in-out ${
                    hoveredIndex === index ? 'scale-x-0' : 'scale-x-100'
                  }`}
                  style={{
                    boxShadow: '0px 0px 6px 4px #000000',
                  }}
                  src={developer.img1}
                  alt={`picture of ${developer.name}`}
                />
                <img
                  className={`border-light absolute h-full w-full transform rounded-full border-4 object-cover transition-transform duration-150 ease-in-out ${
                    hoveredIndex === index ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{
                    boxShadow: '0px 0px 6px 4px #000000',
                  }}
                  src={developer.img2}
                  alt={`picture of ${developer.name}`}
                />
              </div>
              <div className='mb-10 mt-6 flex flex-col sm:mb-[5rem]'>
                <p className='xxs:text-xs font-stroke text-light py-3 text-center'>
                  {developer.name}
                </p>
                <a
                  href={developer.linkedIn}
                  target='_blank'
                  className='transparent flex transform justify-center rounded-full hover:scale-90 hover:border hover:opacity-80'
                  rel='noreferrer'
                >
                  <img src={'/icon-linkedin.svg'} alt='Icon LinkedIn' />
                </a>
                <a
                  href={developer.github}
                  target='_blank'
                  className='transparent flex transform justify-center rounded-full hover:scale-90 hover:border hover:opacity-80'
                  rel='noreferrer'
                >
                  <img src={'/icon-github-planet.svg'} alt='Icon Github' />
                </a>
                <div className='mt-3 flex w-[2/3] justify-center'>
                  {window.innerWidth <= 640 && (
                    <div className='w-11/12 border-t-2 border-blue-300 opacity-60' />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='font-stroke text-light fixed bottom-0 left-0 flex p-2 text-xs'>
        <span>{'YummyCorn - ' + now.toLocaleDateString().slice(6, 10)}</span>
        <img
          src='./yummycorn.svg'
          alt='Beautiful Unicorn'
          className='fixed bottom-0 right-0 mr-3 h-20 w-20'
        />
      </div>
    </div>
  );
}
