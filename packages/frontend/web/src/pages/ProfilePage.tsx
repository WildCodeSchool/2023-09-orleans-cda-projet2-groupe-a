import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import type { UserProfile } from '@app/types';

import Card from '@/components/profile-page/Card';
import CommentsSection from '@/components/profile-page/CommentsSection';
import { Header } from '@/components/profile-page/Header';

import ModalForm from '../components/profile-page/modal/ModalForm';

const urlUser = `/api/user/profile`;

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async (urlUser: string, signal: AbortSignal) => {
    const response = await fetch(urlUser, {
      signal,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.ok === false && data.message === 'not connected') {
        navigate('/register');
      }
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
  }, [urlUser, isOpen]);

  if (isLoading) {
    return null;
  }
  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[url('/profile-page/bg-profil-page.webp')] bg-cover ">
      <Header
        pseudo={user.pseudo}
        image={user.image}
        color={user.color}
        email={user.email}
        setIsOpen={setIsOpen}
      />
      <div className='relative top-[-40px] flex w-screen flex-col items-center lg:top-[-100px]'>
        <h1 className='font-stroke-small-text text-light mb-10 mt-5 text-xl font-extrabold uppercase md:absolute md:right-[75%] md:top-[17%] md:w-[160px] lg:top-[22%] lg:w-[250px] lg:text-2xl '>
          {'your recipes'}
        </h1>
        <div className="z-20 h-[240px] w-[350px] bg-[url('/profile-page/miss-hold-it.webp')] bg-cover sm:h-[400px] sm:w-[600px]" />
        <div className='bg-light border-dark relative top-[-40px] z-10 h-[400px] w-full border-y-[6px] pe-1 sm:top-[-60px] md:h-[800px] md:w-[98%] md:border-[6px]'>
          <div className='bg-light scrollbar-bigger-rounded h-full w-full overflow-y-hidden md:overflow-x-hidden md:overflow-y-scroll'>
            <div className='h-[400px] md:my-5 md:grid md:grid-cols-2 md:gap-5 md:gap-y-16 lg:grid-cols-3 xl:grid-cols-4'>
              {user.cocktails === null ? (
                'there is no cocktails for the moment'
              ) : (
                <Card cocktails={user.cocktails} />
              )}
            </div>
          </div>
        </div>
      </div>
      <CommentsSection comments={user.comments} />
      {isOpen ? (
        <ModalForm
          setIsOpen={setIsOpen}
          pseudo={user.pseudo}
          image={user.image}
          color={user.color}
          email={user.email}
        />
      ) : null}
    </div>
  );
}
