import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Menu from '../components/Menu';

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
        <motion.div
          className='bg-primary/30 flex h-[32vw] w-[32vw] items-center justify-center shadow-lg backdrop-blur-md'
          initial={{
            borderRadius: '50%',
            scale: 1,
          }}
          animate={{
            borderRadius: isSquare ? '0%' : '50%',
            scale: isSquare ? 1.2 : 1,
            rotate: isSquare ? 180 : 0,
            width: isSquare ? '60vw' : '32vw',
            height: isSquare ? '70%' : '32vw',
          }}
          whileTap={{
            scale: 1.1,
          }}
          onClick={() => {
            setIsSquare(true);
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
            borderRadius: { delay: 0.5 },
            delayChildren: 0.5,
            width: { duration: 0.5, delay: 0.5 },
            height: { duration: 0.5, delay: 0.5 },
          }}
        >
          {!isSquare && (
            <div className='flex h-full w-full items-center justify-center'>
              <img
                className='max-h-full max-w-full'
                src='/diagnostic.svg'
                alt='Diagnostic Logo'
              />
            </div>
          )}
          {/* {isSquare ? <Outlet /> : undefined} */}
          {isSquare ? (
            <div className={`absolute ${contentClass}`}>
              <Outlet />
            </div>
          ) : undefined}
        </motion.div>
      </div>
    </div>
  );
}
