import { motion } from 'framer-motion';
import { Heart, Home, Martini, UserCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const iconVariants = {
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: {
        x: { stiffness: 1000 },
      },
    },
  };

  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className='hidden sm:flex sm:justify-end sm:px-10'>
      <button type='button' onClick={handleToggle}>
        <motion.div
          variants={variants}
          initial='hidden'
          animate='visible'
          className='flex items-center justify-end'
        >
          <motion.div
            className='icon flex items-center'
            variants={iconVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home
              color='#0E0F0F'
              className='my-auto me-3 h-7 w-7 cursor-pointer'
            />
          </motion.div>
          {isNavbarOpen ? (
            <>
              <motion.div
                variants={iconVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Martini
                  color='#0E0F0F'
                  className='my-auto me-3 h-7 w-7 cursor-pointer'
                />
              </motion.div>
              <motion.div
                variants={iconVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src='feeding-bottle.svg'
                  alt='feeding-bottle'
                  className='my-auto me-3 h-7 w-7 cursor-pointer'
                />
              </motion.div>
              <motion.div
                variants={iconVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart
                  color='#0E0F0F'
                  className='my-auto me-3 h-7 w-7 cursor-pointer'
                />
              </motion.div>
              <motion.div
                variants={iconVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserCircle2
                  color='#0E0F0F'
                  className='my-auto me-3 h-7 w-7 cursor-pointer'
                />
              </motion.div>
            </>
          ) : undefined}
        </motion.div>
      </button>
    </div>
  );
}
