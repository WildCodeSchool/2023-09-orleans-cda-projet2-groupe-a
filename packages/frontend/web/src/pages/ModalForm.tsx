import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ModalFormProps {
  readonly setIsOpen: (value: boolean) => void;
  readonly id: string | undefined;
  readonly pseudo: string;
  readonly email: string;
  readonly password: string;
  readonly image: string;
  readonly color: string;
}

interface UserInfoForm {
  pseudo: string;
  email: string;
  password: string;
  color: string;
  image: string;
}

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
const avatars = [
  'avatar-1.webp',
  'avatar-2.webp',
  'avatar-3.webp',
  'avatar-4.webp',
  'avatar-5.webp',
  'avatar-6.webp',
  'avatar-7.webp',
  'avatar-8.webp',
  'avatar-9.webp',
  'avatar-10.webp',
  'avatar-11.webp',
  'avatar-12.webp',
  'avatar-13.webp',
  'avatar-14.webp',
  'avatar-15.webp',
  'avatar-16.webp',
  'avatar-17.webp',
  'avatar-18.webp',
  'avatar-19.webp',
  'avatar-20.webp',
  'avatar-21.webp',
  'avatar-22.webp',
];

export default function ModalForm({
  setIsOpen,
  id,
  pseudo,
  email,
  password,
  color,
  image,
}: ModalFormProps) {
  const [selectedColor, setSelectedColor] = useState<string>(color);
  const [selectedImage, setSelectedImage] = useState<string>(image);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserInfoForm>({
    defaultValues: {
      pseudo: pseudo,
      email: email,
      password: password,
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
            className='border-dark flex h-[45rem] w-[90%] items-center justify-center rounded-xl border-[3px] bg-[url("/profile-page/modal-cloud.jpg")] bg-cover bg-center bg-no-repeat shadow-md sm:w-[60%]'
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='bg-light flex h-[90%] w-[80%] flex-col items-center justify-start rounded-sm bg-opacity-80 py-4'
            >
              <div className='flex flex-col items-center gap-5'>
                <div className='flex w-[80%] flex-col items-center gap-5'>
                  <div className='flex w-full items-center justify-between gap-5'>
                    <label className='font-stroke w-[100px] text-lg uppercase text-white'>
                      {'Pseudo'}
                    </label>
                    <input
                      className='border-dark w-[80%] rounded-sm border-[4px] p-1'
                      {...register('pseudo', {
                        required: true,
                        maxLength: {
                          value: 255,
                          message: 'Max length exceeded !',
                        },
                      })}
                    />
                  </div>
                  <div className='flex w-full items-center justify-between gap-5'>
                    <label className='font-stroke w-[100px] text-lg uppercase text-white'>
                      {'Email'}
                    </label>
                    <input
                      className='border-dark w-[80%] rounded-sm border-[4px] p-1'
                      {...register('email', {
                        required: true,
                        maxLength: {
                          value: 255,
                          message: 'Max length exceeded !',
                        },
                      })}
                    />
                  </div>
                  <div className='flex w-full items-center justify-between gap-5'>
                    <label className='font-stroke w-[100px] text-lg uppercase text-white'>
                      {'Password'}
                    </label>
                    <input
                      className='border-dark w-[80%] rounded-sm border-[4px] p-1'
                      {...register('password', {
                        required: true,
                        maxLength: {
                          value: 255,
                          message: 'Max length exceeded !',
                        },
                      })}
                    />
                  </div>
                </div>

                <div className='self-start px-4'>
                  <label className='font-stroke text-lg uppercase text-white'>
                    {'Profile'}
                  </label>

                  <div className='grid grid-cols-4 gap-2'>
                    <div className='border-dark col-span-1 rounded-sm border-[5px] bg-white p-3'>
                      <h5 className='font-stroke-small-text text-sm uppercase text-white'>
                        {'Your color'}
                      </h5>
                      <fieldset>
                        {colors.map((color) => (
                          <div key={color} className='flex gap-3'>
                            <input
                              className='hover:cursor-pointer'
                              type='radio'
                              id={color}
                              value={color}
                              {...register('color', {
                                required: true,
                                maxLength: {
                                  value: 255,
                                  message: "can't be longer than 255",
                                },
                                validate: {
                                  isString: (value) =>
                                    typeof value === 'string' ||
                                    'Must be a string',
                                },
                              })}
                              checked={selectedColor === color}
                              onChange={() => {
                                handleColorChange(color);
                              }}
                            />
                            <div
                              className={` my-1 h-[30px] w-[30px] bg-profile-picture-${color}`}
                            />
                            <label
                              className='hover:cursor-pointer'
                              htmlFor={color}
                            >
                              {color}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    </div>

                    <div className='col-span-3 flex flex-col items-center gap-2'>
                      <div>
                        <img
                          src={`/avatar/${selectedImage}`}
                          alt='user image'
                          className={`border-dark ml-1 h-[200px] w-[200px] rounded-full border-[4px] bg-profile-picture-${selectedColor} object-cover`}
                        />
                      </div>
                      <div className='border-dark rounded-sm border-[5px] bg-white p-3'>
                        <fieldset className='grid h-[150px] grid-cols-4 gap-5 overflow-x-hidden overflow-y-scroll'>
                          {avatars.map((avatar) => (
                            <div key={avatar} className='flex gap-3'>
                              <input
                                className='hover:cursor-pointer'
                                type='radio'
                                id={avatar}
                                value={avatar}
                                {...register('image', {
                                  required: true,
                                  maxLength: {
                                    value: 255,
                                    message: "can't be longer than 255",
                                  },
                                  validate: {
                                    isString: (value) =>
                                      typeof value === 'string' ||
                                      'Must be a string',
                                  },
                                })}
                                checked={selectedImage === avatar}
                                onChange={() => {
                                  handleImageChange(avatar);
                                }}
                              />
                              <img
                                src={`/avatar/${avatar}`}
                                alt={avatar}
                                className=' w-[70%] object-cover'
                                onClick={() => {
                                  handleImageChange(avatar);
                                }}
                              />
                            </div>
                          ))}
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type='submit'
                className='font-stroke uppercase text-white'
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
