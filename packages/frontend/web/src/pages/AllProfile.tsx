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

export default function AllProfile() {
  const url = `${import.meta.env.VITE_API_URL}/user`;
  const { data } = useFetch<UserProfile[]>(url);

  return (
    <div className="flex h-screen w-screen flex-col items-center overflow-x-hidden overflow-y-scroll bg-[url('/community/bg-all-profile.webp')] bg-cover ">
      <img
        src='/community/header-community.png'
        alt='header community page'
        className='mb-10 me-[28px] mt-20 sm:me-0'
      />
      <div className='grid w-full grid-cols-1 sm:w-[95%] sm:grid-cols-2 sm:gap-5 sm:gap-y-16 lg:grid-cols-3 xl:grid-cols-4'>
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
                          className={`border-dark ml-1 h-[9rem] w-[8rem] rounded-full border-[4px] sm:mx-auto sm:mt-8 sm:h-[13rem] sm:w-[14rem] sm:border-[6px] bg-profil-picture-${user.color} object-cover`}
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
                                      Math.floor(user.average_rating / 2)
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
