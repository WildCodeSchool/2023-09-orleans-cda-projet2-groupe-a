import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { UserInfoForm } from '@app/types';

interface FormPartPros {
  readonly register: UseFormRegister<UserInfoForm>;
  readonly errors: FieldErrors<UserInfoForm>;
}

const labels = ['pseudo', 'email', 'password'];

export default function FormPart({ register, errors }: FormPartPros) {
  return (
    <div className='w-[80%] flex-col items-center gap-3 lg:flex'>
      {labels.map((label) => (
        <div key={label}>
          <div className='w-full items-center justify-between gap-3 lg:flex'>
            <label className='font-stroke 2xl:text-md mr-10 w-[100px] text-sm uppercase text-white lg:mr-0 lg:text-sm xl:text-sm'>
              {label}
            </label>
            <input
              type={label}
              className='border-dark w-full rounded-sm  border-[4px] p-1 md:w-[80%]'
              {...register(label as 'pseudo' | 'email' | 'password', {
                required: true,
                maxLength: {
                  value: 255,
                  message: 'Max length exceeded !',
                },
              })}
            />
          </div>
          {errors.pseudo?.type === 'maxLength' ? (
            <span className='text-sm'>{errors.pseudo.message}</span>
          ) : undefined}
          {errors.pseudo?.type === 'required' ? (
            <span>{errors.pseudo.message}</span>
          ) : undefined}
        </div>
      ))}
    </div>
  );
}
