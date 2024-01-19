import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, ShoppingBag, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

interface CardFinalDiagnosticProps {
  readonly bool: boolean;
  readonly setBool: (value: boolean) => void;
}

export default function Menu({ bool, setBool }: CardFinalDiagnosticProps) {
  const [isOpen, setIsOpen] = useState(false);
  const productsString = localStorage.getItem('selectedProducts');
  const [products, setProducts] = useState([]);

  console.log(products);

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setBool(!bool);
    if (Boolean(productsString)) {
      setProducts(JSON.parse(productsString as string));
    }
  }, [productsString, setBool]);
  console.log(bool);

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
              <Link to='/profil'>
                <UserRound className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg transition-transform duration-300 hover:scale-110' />
              </Link>
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
              <Link to={'/final-diagnostic'}>
                <div
                  className={`${products.length === 0 ? 'hidden' : ''} text-primary relative left-[30px] h-[17px] w-[17px] rounded-full bg-red-600 text-center text-xs tracking-tighter`}
                >
                  {products.length}
                </div>
                <ShoppingBag
                  className={`hover:scale-11 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg transition-transform duration-300 ${products === null ? '' : 'fill-black text-white'}`}
                />
              </Link>
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
