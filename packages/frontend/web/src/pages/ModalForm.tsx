import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import type { InputCocktailForm } from '@/components/cocktail-detail/AddComment';

interface ModalFormProps {
  readonly setIsOpen: (value: boolean) => void;
  readonly id: string | undefined;
}

export default function ModalForm({ setIsOpen, id }: ModalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputCocktailForm>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: InputCocktailForm) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/comment/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsOpen(false);
    } catch {
      console.error(`Request error`);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div
          className='fixed inset-0 z-[99] flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-70'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className='bg-light border-dark h-[42rem] w-[91100%] rounded-xl border-[3px] bg-[url("/profile-page/modal-cloud.jpg")] bg-cover bg-center bg-no-repeat shadow-md sm:w-[40rem] '
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
          <div className='flex justify-center'>
            <button
              type='button'
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <div className='font-stroke text-light hover:text-dark-orange duration-250 mt-8 cursor-pointer text-[2rem] transition-transform ease-in-out hover:scale-110'>
                {'X'}
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
