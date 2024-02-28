import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import type { UserProfile } from '@app/types';

import Card from '@/components/profile-page/Card';
import CommentsSection from '@/components/profile-page/CommentsSection';
import { PublicHeader } from '@/components/profile-page/PublicHeader';

export default function PublicProfilePage() {
  const { id } = useParams();
  const urlUser = `/api/user/${id}`;
  const [user, setUser] = useState<Omit<UserProfile, 'email'>>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (urlUser: string, signal: AbortSignal) => {
    const response = await fetch(urlUser, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchUser(urlUser, signal).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [urlUser]);

  if (isLoading) {
    return null;
  }
  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[url('/bg-profile-page.jpg')] bg-cover ">
      <PublicHeader
        pseudo={user.pseudo}
        image={user.image}
        color={user.color}
      />
      <div className='relative top-[-200px] flex w-screen flex-col items-center sm:top-[-400px] md:top-[-200px] lg:top-[-100px]'>
        <h1 className='font-stroke-title text-light mb-10 mt-20 text-[1.6rem] font-extrabold uppercase md:absolute md:left-[2rem] md:top-[17%] md:mt-5 md:w-[160px] lg:top-[12%] lg:w-[250px] lg:text-[1.6rem] '>
          {'your recipes'}
        </h1>
        <img
          className='z-20 mt-10 w-[500px]'
          src='/profile-page/miss-hold-it.webp'
        />
        {user.cocktails === null ? (
          <div className='bg-light border-dark relative top-[-55px] z-10 w-full border-y-[6px] pe-1 md:w-[50%] md:border-[6px]'>
            <p className='my-12 flex justify-center'>
              {`"there is no cocktails for the moment"`}
            </p>
          </div>
        ) : (
          <div className='bg-light border-dark relative top-[-40px] z-10  w-full border-y-[6px] pe-1 sm:top-[-55px] md:w-[98%] md:border-[6px]'>
            <div className='bg-light scrollbar-bigger-rounded h-full max-h-[800px] w-full overflow-y-hidden md:overflow-x-hidden md:overflow-y-scroll'>
              <div className='h-[400px] md:my-5 md:grid md:grid-cols-2 md:gap-5 md:gap-y-16 lg:grid-cols-3 xl:grid-cols-4'>
                <Card cocktails={user.cocktails} />
              </div>
            </div>
          </div>
        )}
      </div>
      <CommentsSection comments={user.comments} />
    </div>
  );
}
