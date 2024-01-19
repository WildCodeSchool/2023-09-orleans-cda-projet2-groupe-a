import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Menu from '../components/Menu';
import Inscription from './Inscription';

export default function Diagnostic() {
  const [isSquare, setIsSquare] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const contentClass = isSquare ? 'rotate-180' : '';

  useEffect(() => {
    if (isSquare) {
      const timeoutId = setTimeout(() => {
        setShowForm(true);
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isSquare]);
  const [bool, setBool] = useState(false);
  return (
    <div
      style={{ backgroundImage: `url('/bg.png')` }}
      className='flex h-full w-full flex-col overflow-hidden bg-cover bg-no-repeat text-center font-bold uppercase tracking-widest'
    >
      <div className='p-10'>
        <div className='w-40'>
          <img src='/logo.png' />
        </div>
        <Menu bool={bool} setBool={setBool} />
      </div>
      <div className='flex grow items-center justify-center'>
        <Outlet />
      </div>
    </div>
  );
}
