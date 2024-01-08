import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { UserInfoForm } from '@app/types';

import AvatarPart from './AvatarPart';
import FormPart from './FormPart';

interface ModalFormProps {
  readonly setIsOpen: (value: boolean) => void;
  readonly id: string | undefined;
  readonly pseudo: string;
  readonly email: string;
  readonly image: string;
  readonly color: string;
}

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];

export default function ModalForm({
  setIsOpen,
  id,
  pseudo,
  email,
  color,
  image,
}: ModalFormProps) {
  const [selectedColor, setSelectedColor] = useState<string>(color);
  const [selectedImage, setSelectedImage] = useState<string>(image);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UserInfoForm>({
    defaultValues: {
      pseudo: pseudo,
      email: email,
      password: '*******',
    },
  });
  const onSubmit = async (data: UserInfoForm) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleColorChange = (color: string) => {
    setValue('color', color);
    setSelectedColor(color);
  };

  const handleImageChange = (image: string) => {
    setValue('image', image);
    setSelectedImage(image);
  };

  const handleErrorSubmit = () => {
    const imageValue = watch('image');

    if (typeof imageValue === 'string' && imageValue.length <= 255) {
      clearErrors('image');
    } else {
      setError('image', {
        type: 'validate',
        message: 'must be one of the proposed choices',
      });
    }
    const colorValue = watch('color');

    if (colors.includes(colorValue)) {
      clearErrors('color');
    } else {
      setError('color', {
        type: 'validate',
        message: 'must be one of the proposed choices',
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div
          className='fixed inset-0 z-[99] flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-70'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className='border-dark flex h-[48rem] w-[90%] items-center justify-center rounded-xl border-[3px] bg-[url("/profile-page/modal-cloud.jpg")] bg-cover bg-center bg-no-repeat shadow-md sm:w-[70%]'
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='bg-light flex h-[90%] w-[80%] flex-col overflow-x-hidden overflow-y-scroll rounded-sm bg-opacity-80 p-2 py-3 md:justify-center md:overflow-hidden md:p-4 md:py-6'
            >
              <div className='flex flex-col items-center'>
                <div className='flex flex-col items-center gap-10 md:flex-row'>
                  <div>
                    <img
                      src={`/avatar/${selectedImage}`}
                      alt='user image'
                      className={`border-dark ml-1 h-[175px] w-[200px] rounded-full border-[7px] bg-profile-picture-${selectedColor} object-cover`}
                    />
                  </div>
                  <FormPart register={register} errors={errors} />
                </div>

                <div
                  className={`${
                    Object.keys(errors).length === 0 ? 'mt-14' : 'mt-0'
                  } self-start px-4`}
                >
                  {errors.color?.type === 'validate' ? (
                    <span className='text-sm'>{errors.color.message}</span>
                  ) : undefined}
                  <div className='mb-5 gap-14 sm:flex'>
                    <div className='border-dark col-span-1 mb-5 flex justify-evenly rounded-sm border-[5px] bg-white p-1 sm:mb-0 sm:w-[50px] sm:flex-col sm:items-center sm:justify-evenly sm:p-3'>
                      {colors.map((color) => (
                        <div
                          key={color}
                          className={`h-[25px] w-[25px] cursor-pointer rounded-full sm:h-[30px] sm:w-[30px] bg-profile-picture-${color} ${
                            selectedColor === color
                              ? 'border-dark border-[3px]'
                              : null
                          }`}
                          onClick={() => {
                            handleColorChange(color);
                          }}
                        />
                      ))}
                    </div>

                    <div className='col-span-7 flex flex-col items-center gap-2'>
                      <div className='border-dark h-[362px] overflow-y-scroll rounded-sm border-[5px] bg-white p-4'>
                        {errors.image?.type === 'validate' ? (
                          <span className='text-sm'>
                            {errors.image.message}
                          </span>
                        ) : undefined}
                        {errors.image?.type === 'required' ? (
                          <span>{errors.image.message}</span>
                        ) : undefined}
                        <fieldset className='grid grid-cols-1 gap-5 overflow-x-hidden md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                          <AvatarPart
                            register={register}
                            handleImageChange={handleImageChange}
                            selectedImage={selectedImage}
                          />
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type='submit'
                onClick={() => {
                  handleErrorSubmit();
                }}
                className='font-stroke uppercase text-white sm:mr-5 sm:self-end'
              >
                {'Submit !'}
              </button>
            </form>
          </div>
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
