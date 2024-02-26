import { Link } from 'react-router-dom';

import useFetch from '@/hooks/use-fetch';

interface UserProfile {
  id: number;
  pseudo: string;
  image: string;
  color: string;
  cocktail_count: number;
  average_rating: number | null;
}

const url = `/api/user`;

export default function Community() {
  const { data } = useFetch<UserProfile[]>(url);

  return (
    <div
      className='m-auto h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('/community/bg-all-profile.webp')` }}
    >
      <div
        className='shadow-card-community mx-auto flex h-[13rem] w-[90vw] rounded border-[4px] border-[#B58EBA] bg-[#B61BCB] bg-cover bg-center shadow-lg transition-transform ease-in-out hover:scale-110 sm:w-[70vw] md:h-[12.5rem] md:w-[24rem]'
        style={{ backgroundImage: `url('purple-dot.png')` }}
      >
        <div className='relative h-full w-full'>
          <h1 className='font-stroke text-light absolute top-2 z-50 m-auto flex stroke-[2rem] py-[4rem] ps-3 text-center text-[2.3rem] font-extrabold uppercase'>{`Community`}</h1>
          <div className='flex justify-end'>
            <img
              src='/home/home-1.png'
              alt='Girls talking'
              className='absolute top-2 z-20 h-[13rem] sm:h-[11rem] sm:w-[11rem]'
            />
          </div>
        </div>
      </div>
      <div className='mx-auto mt-10 grid w-full grid-cols-1 sm:w-[95%] sm:grid-cols-2 sm:gap-5 sm:gap-y-16 lg:grid-cols-3 xl:grid-cols-4'>
        {data === undefined
          ? null
          : data.map((user) => (
              <div
                key={user.id}
                className='mb-10 flex h-full w-full items-center justify-center'
              >
                <Link to={`/profile/${user.id}`}>
                  <div
                    className={`border-dark bg-card-virgin-light-blue mb-6 me-[20px] h-[200px] w-[300px] rounded-sm border-[3px] sm:me-[30px] sm:h-[336px] sm:w-[288px]`}
                  >
                    <div
                      className={`border-dark bg-card-virgin-strong-pink relative left-[7px] top-[7px] h-[200px] w-[300px] rounded-sm border-[3px] sm:left-[11px] sm:top-[11px] sm:h-[336px] sm:w-[288px]`}
                    >
                      <div
                        className={`border-dark bg-card-virgin-strong-purple relative left-[32x] top-[8px] mx-2 flex h-[200px] w-[300px] items-center rounded-sm border-[3px] sm:left-[6px] sm:top-[11px] sm:block sm:h-[336px] sm:w-[288px]`}
                      >
                        <img
                          src={`/avatar/${user.image}`}
                          alt='user image'
                          className={`border-dark ml-1 h-[9rem] w-[8rem] rounded-full border-[4px] sm:mx-auto sm:mt-8 sm:h-[13rem] sm:w-[14rem] sm:border-[6px] bg-profile-picture-${user.color} object-cover`}
                        />
                        <div className='flex h-full w-full flex-col justify-evenly sm:block sm:h-auto'>
                          <div className='mx-4 mt-3 text-center'>
                            <h1 className='text-dark text-md mb-5 uppercase tracking-wider sm:mb-0'>
                              {user.pseudo}
                            </h1>
                          </div>
                          <div>
                            <p className='mb-3 text-center sm:mb-0'>
                              {`(${user.cocktail_count} cocktail${
                                user.cocktail_count > 1 ? 's' : ''
                              })`}
                            </p>
                            <div className='flex justify-center'>
                              {user.average_rating === null ? (
                                <p className='text-sm font-extralight'>
                                  {'not grade yet'}
                                </p>
                              ) : (
                                [1, 2, 3, 4, 5].map((index) => (
                                  <div
                                    key={index}
                                    className={`h-[30px] w-[30px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale ${
                                      index <=
                                      Math.floor((user.average_rating ?? 0) / 2)
                                        ? 'grayscale-0 '
                                        : 'grayscale'
                                    }`}
                                  />
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}
