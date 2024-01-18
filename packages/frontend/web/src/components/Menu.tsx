import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, ShoppingCart, UserRound } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );
      if (response.ok) {
        console.log('Déconnexion réussie');
        setIsLoggedIn(false);
      } else {
        console.error('Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  return (
    <div className={`nav ${isOpen ? 'menu-open' : ''}`}>
      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              key='user'
              initial={{ opacity: 0, x: -90 }}
              animate={{ opacity: 1, x: -90 }}
              exit={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
              whileHover={{ scale: 1.2 }}
              className='bg-primary/30 absolute right-[2rem] top-[2rem] h-[50px] w-[50px] cursor-pointer rounded-full border shadow-lg backdrop-blur-md '
            >
              <UserRound className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg transition-transform duration-300 hover:scale-110' />
            </motion.div>
            <motion.div
              key='logout'
              initial={{ opacity: 0, x: -70, y: 70 }}
              animate={{
                opacity: 1,
                x: -70,
                y: 70,
                transition: { delay: 0.2 },
              }}
              exit={{ opacity: 1, x: 0, y: 0, transition: { delay: 0.2 } }}
              whileHover={{ scale: 1.2 }}
              className='bg-primary/30 absolute right-[2rem] top-[2rem] h-[50px] w-[50px] cursor-pointer rounded-full  shadow-lg backdrop-blur-md'
            >
              <ShoppingCart className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg transition-transform duration-300 hover:scale-110' />
            </motion.div>

            <motion.div
              key='cart'
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 90, transition: { delay: 0.4 } }}
              exit={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.2 }}
              className='bg-primary/30 absolute right-[2rem] top-[2rem] h-[50px] w-[50px] cursor-pointer rounded-full shadow-lg backdrop-blur-md'
            >
              <LogOut
                onClick={handleLogout}
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg transition-transform duration-300 hover:scale-110'
              />
            </motion.div>
          </>
        ) : undefined}
      </AnimatePresence>

      <motion.div
        className='bg-primary/30 absolute right-[2rem] top-[2rem] h-[60px] w-[60px] cursor-pointer rounded-full border shadow-lg backdrop-blur-md'
        onClick={toggleMenu}
      >
        <img
          src='/menu.svg'
          className='absolute left-1/2 top-1/2 z-50 h-[2rem] w-[2rem] -translate-x-1/2 -translate-y-1/2 transform'
        />
      </motion.div>
    </div>
  );
}
