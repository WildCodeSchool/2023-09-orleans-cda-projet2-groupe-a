import { Navigate, useParams } from 'react-router-dom';

import type { UserProfile } from '@app/types';

import Card from '@/components/profile-page/Card';
import CommentsSection from '@/components/profile-page/CommentsSection';
import { Header } from '@/components/profile-page/Header';
import useFetch from '@/hooks/use-fetch';

export default function ProfilePage() {
  const { id } = useParams();
  const urlCocktail = `${import.meta.env.VITE_API_URL}/user/${id}`;

  const { data, isLoading, error } = useFetch<UserProfile[]>(urlCocktail);
  console.log('data', data);
  console.log('error', error);
  console.log('isloading', isLoading);

  if (isLoading) {
    return null;
  }

  if (!data && error === null) {
    return <Navigate to='/' />;
  }

  return data === undefined ? null : (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[url('/profile-page/bg-profil-page.webp')] bg-cover ">
      <Header pseudo={data[0].pseudo} />
      <div className='relative top-[-40px] flex w-screen flex-col items-center lg:top-[-100px]'>
        <h1 className='font-stroke-small-text text-light mb-10 mt-5 text-xl font-extrabold uppercase md:absolute md:right-[75%] md:top-[17%] md:w-[160px] lg:top-[22%] lg:w-[250px] lg:text-2xl '>
          {'your recipes'}
        </h1>
        <div className="z-20 h-[240px] w-[350px] bg-[url('/profile-page/miss-hold-it.webp')] bg-cover sm:h-[400px] sm:w-[600px]" />
        <div className='bg-light border-dark relative top-[-40px] z-10 h-[400px] w-full border-y-[6px] pe-1 sm:top-[-60px] md:h-[800px] md:w-[98%] md:border-[6px]'>
          <div className='bg-light scrollbarProfile h-full w-full overflow-y-hidden md:overflow-x-hidden md:overflow-y-scroll'>
            <div className='h-[400px] md:my-5 md:grid md:grid-cols-2 md:gap-5 md:gap-y-16 lg:grid-cols-3 xl:grid-cols-4'>
              {data[0].cocktails === null ? (
                'there is no cocktails for the moment'
              ) : (
                <Card cocktails={data[0].cocktails} />
              )}
            </div>
          </div>
        </div>
      </div>
      <CommentsSection comments={data[0].comments} />
    </div>
  );
}
