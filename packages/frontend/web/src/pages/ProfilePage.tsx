import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

import { useDisclosure } from '@app/frontend-shared';

import CocktailCard from '@/components/CocktailCard';
import Comment from '@/components/Comment';
import StarRating from '@/components/StarRating';

// Add the correct import path for StarRating

export default function ProfilePage() {
  const { isOpen: isCommentsOpen, onToggle: onCommentsToggle } =
    useDisclosure(false);

  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[url('profile-page/bg-profil-page.png')] bg-cover ">
      <h1 className='font-stroke-profile-main text-light pt-10 text-center text-[2rem] font-extrabold uppercase sm:mx-10 sm:pt-16 sm:text-start sm:text-[2.5rem]'>
        {'Welcome Justin'}
      </h1>
      <div className="gb-center relative right-[54%] flex h-[75%] w-[200%] items-center justify-center bg-[url('profile-page/profile-header.png')] bg-contain bg-no-repeat sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-6">
        {/* <img
          className='absolute left-[41%] top-[7%] w-[20%] sm:top-[6%] md:top-[8%] lg:top-[10%] '
          src='profile-page/avatar.png'
          alt=''
        />
        <p className='rotate relative right-[-14%] top-[-25%] w-[50px] rotate-[30deg] text-[0.60rem] sm:right-[14%] sm:top-[-28%] md:right-[12%] md:top-[-23%] lg:right-[12%] lg:top-[-15%] lg:rotate-[40deg] lg:text-sm'>
          {'change your avatar'}
        </p> */}
        <img
          src='profile-page/bubble.png'
          alt=''
          className='absolute right-[18%] top-[25%] h-[450px] w-[450px] rotate-[80deg] lg:right-[10%] lg:top-[25%] lg:h-[450px] lg:w-[450px] lg:rotate-[35deg]'
        />
        <div className='md:w-[500px]] absolute right-[18%] top-[25%] flex h-[450px] w-[450px] rotate-[25deg] items-center justify-center lg:right-[10%] lg:top-[25%] lg:h-[450px] lg:w-[450px] lg:rotate-[-20deg]'>
          <div className='flex flex-col gap-3'>
            <div>
              <h2 className='uppercase'>{'email:'}</h2>
              <p className='lg:text-md md:text-sm'>{'email.fake@gmail.com'}</p>
              <p className='text-xs'>{'change your email'}</p>
            </div>
            <div>
              <h2 className='uppercase'>{'password:'}</h2>
              <p>{'*********'}</p>
              <p className='text-xs'>{'change your password'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='relative top-[-40px] flex w-screen flex-col items-center lg:top-[-100px]'>
        <h1 className='font-stroke-profile-h2 text-light mb-10 mt-5 text-xl font-extrabold uppercase sm:absolute sm:right-[75%] sm:top-[17%] sm:w-[160px] md:right-[80%] md:top-[20%] lg:top-[22%] lg:w-[200px] lg:text-2xl '>
          {'your recipes'}
        </h1>
        <div className="z-20 h-[240px] w-[350px] bg-[url('profile-page/miss-hold-it.png')] bg-cover sm:h-[400px] sm:w-[600px]" />
        <div className='bg-light border-dark relative top-[-40px] z-10 h-[400px] w-full overflow-y-scroll border-y-[6px] sm:top-[-60px] sm:h-[800px] sm:w-[90%] sm:border-[6px]'>
          <div className='grid h-[400px] gap-5 gap-y-10 overflow-y-visible md:grid-cols-2 lg:grid-cols-3'>
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
            <CocktailCard />
          </div>
        </div>
      </div>
      <div>
        <h1 className='font-stroke-profile-h2 text-light text-xl font-extrabold uppercase lg:text-2xl'>
          {'your comments'}
        </h1>
        <div>
          <div className='ps-2'>
            <div className='font-stroke text-light mb-10 flex text-[1.5rem] font-extrabold uppercase'>
              {isCommentsOpen ? (
                <button type='button' onClick={onCommentsToggle}>
                  <Minus
                    color='#0E0F0F'
                    className='stroke-4 my-auto me-3 h-7 w-7 cursor-pointer'
                    style={{ strokeWidth: '4' }}
                  />
                </button>
              ) : (
                <button type='button' onClick={onCommentsToggle}>
                  <Plus
                    color='#0E0F0F'
                    className='stroke-4 my-auto me-3 h-7 w-7 cursor-pointer'
                    style={{ strokeWidth: '4' }}
                  />
                </button>
              )}
              <h2 className='pe-2'>{`review`}</h2>
              <div className='my-auto flex'>
                <StarRating starCount={5} />
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isCommentsOpen ? (
              <motion.div
                initial={{ opacity: 0, height: '0rem' }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: '0rem' }}
                transition={{ duration: 1 }}
                className='border-dark bg-pastel-green m-auto mb-20 flex w-[70%] flex-wrap rounded-sm border-[3px] object-contain uppercase sm:w-[90%]'
              >
                <Comment numberComment={4} />
              </motion.div>
            ) : undefined}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
