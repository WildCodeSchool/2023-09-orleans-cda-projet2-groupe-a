import ReactPlayer from 'react-player';
import { Outlet } from 'react-router-dom';

import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';

import Loading from '../components/Loading';

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();
  const videoUrl = '/home-video.mp4';

  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return (
      <main className='relative h-screen w-screen overflow-hidden'>
        <Outlet />
      </main>
    );
  }

  return (
    <main className='relative h-screen w-screen overflow-hidden bg-black'>
      <ReactPlayer
        url={videoUrl}
        width='100%'
        height='100%'
        playing
        muted
        loop
        pip
      />
      <div className='absolute left-[20px] top-[1px] z-10 flex items-center justify-center lg:left-[120px] xl:left-[150px]'>
        <div className='mt-24 h-[70vh] w-[95vw] shadow-lg lg:w-[80vw]'>
          <div className='flex'>
            <div className='bg-primary/30 h-[80vh] w-1/2 px-10 backdrop-blur-md'>
              <div className=' mt-32 h-[450px] w-[450px]'>
                <Logo />
              </div>
              {/* <img
                className='m-auto mt-32 h-[450px] w-[450px]'
                src='/Logo2.svg'
              /> */}
            </div>
            <div className='bg-secondary text-primary h-[80vh] w-[50%]'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
