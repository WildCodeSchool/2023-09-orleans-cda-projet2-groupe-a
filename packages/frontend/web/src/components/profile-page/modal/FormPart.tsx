import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { UserInfoForm } from '@app/types';

interface FormPartProps {
  readonly register: UseFormRegister<UserInfoForm>;
  readonly errors: FieldErrors<UserInfoForm>;
}

export default function FormPart({ register, errors }: FormPartProps) {
  const inputs = [
    {
      label: 'email',
      type: 'email',
      name: 'email',
      errors: [],
      errorsMessage: '',
    },
    {
      label: 'pseudo',
      type: 'text',
      name: 'pseudo',
      errors: [
        errors.pseudo?.type === 'maxLength',
        errors.pseudo?.type === 'minLength',
      ],
      errorsMessage: errors.pseudo?.message,
    },
    {
      label: 'current password',
      type: 'password',
      name: 'currentPassword',
      errors: [
        errors.currentPassword?.type === 'maxLength',
        errors.currentPassword?.type === 'minLength',
        errors.currentPassword?.type === 'validate',
      ],
      errorsMessage: errors.currentPassword?.message,
    },
    {
      label: 'new password',
      type: 'password',
      name: 'newPassword',
      errors: [
        errors.newPassword?.type === 'maxLength',
        errors.newPassword?.type === 'minLength',
        errors.newPassword?.type === 'validate',
      ],
      errorsMessage: errors.newPassword?.message,
    },
    {
      label: 'confirm new password',
      type: 'password',
      name: 'confirmNewPassword',
      errors: [
        errors.confirmNewPassword?.type === 'maxLength',
        errors.confirmNewPassword?.type === 'minLength',
      ],
      errorsMessage: errors.confirmNewPassword?.message,
    },
  ];

  return (
    <div className='w-[80%] flex-col items-center gap-3 lg:flex'>
      {inputs.map((input) => (
        <div key={input.label}>
          <div className='w-full items-center justify-between gap-3 lg:flex'>
            <label
              className={`font-stroke 2xl:text-md ${
                input.label === 'email' || input.label === 'pseudo'
                  ? 'mr-10'
                  : 'false'
              } w-[100px] text-sm uppercase text-white md:text-xs lg:mr-0 lg:text-sm`}
            >
              {input.label}
            </label>
            <div className='flex flex-col'>
              <input
                type={input.type}
                readOnly={input.type === 'email' ? true : false}
                className='border-dark w-full rounded-sm  border-[4px] p-1 md:w-[80%]'
                {...register(input.name as keyof UserInfoForm, {
                  maxLength: {
                    value: 255,
                    message: 'Max length exceeded !',
                  },
                  minLength: {
                    value: 3,
                    message: 'must be at least 3 characters',
                  },
                })}
              />
              {input.errors.map((error) => {
                return error ? (
                  <span key={input.errorsMessage} className='text-sm'>
                    {input.errorsMessage}
                  </span>
                ) : undefined;
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
