import { Outlet } from 'react-router-dom';

import Menu from '../components/Menu';

export default function Diagnostic() {
  return (
    <div
      style={{ backgroundImage: `url('/bg.png')` }}
      className='flex h-full w-full flex-col overflow-hidden bg-cover bg-no-repeat text-center font-bold uppercase tracking-widest'
    >
      <div className='p-10'>
        <div className='w-40'>
          <img src='/logo.png' />
        </div>
        <Menu />
      </div>
      <div className='flex grow items-center justify-center'>
        <div className='bg-background flex h-[80%] w-[80vw] shadow-md'>
          <Outlet />
          <div className='flex h-full w-full items-center justify-center'>
            <img className=' mb-40 h-[450px] w-[450px]' src='/diagnostic.svg' />
          </div>
        </div>
      </div>
    </div>
  );
}
