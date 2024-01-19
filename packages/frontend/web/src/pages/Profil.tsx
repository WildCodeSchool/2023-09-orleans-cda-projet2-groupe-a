import { useState } from 'react';

import Menu from '@/components/Menu';

export default function Profil() {
  const [bool, setBool] = useState(false);
  return (
    <div
      style={{ backgroundImage: `url('/bg.png')` }}
      className='flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-cover bg-no-repeat'
    >
      <div>
        <Menu bool={bool} setBool={setBool} />
      </div>
      <div className='bg-primary flex w-3/4 flex-row gap-6'>
        <div className='flex justify-center p-4'>
          <img src='/Logo2.svg' alt='logo' className='w-full' />
        </div>
        <div className='bg-secondary text-primary font-base flex grow flex-row items-center justify-center gap-6 p-3'>
          <form className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='prenom'>{'Prénom:'}</label>
              <input
                type='text'
                id='prenom'
                value='Amaury'
                className='border-divider text-primary w-full border-b-2 bg-transparent'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='nom'>{'Nom:'}</label>
              <input
                type='text'
                id='nom'
                value='Becker'
                className='border-divider text-primary w-full border-b-2 bg-transparent'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='mail'>{'Email:'}</label>
              <input
                type='text'
                id='mail'
                value='toto@gmail.com'
                className='border-divider text-primary w-full border-b-2 bg-transparent'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='birthdate'>{'Date de naissance:'}</label>
              <input
                type='date'
                id='birthdate'
                className='border-divider bg-transparent'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='genre'>{'Genre:'}</label>
              <select id='genre' className='border-divider bg-transparent'>
                <option value='male'>{'Homme'}</option>
                <option value='female'>{'Femme'}</option>
                <option value='other'>{'Autre'}</option>
              </select>
            </div>
            <button className='bg-primary text-secondary rounded-sm'>
              {'Modifier'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
