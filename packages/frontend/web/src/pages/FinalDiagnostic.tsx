import CardFinalDiagnostic from '@/components/CardFinalDiagnostic';

import Menu from '../components/Menu';

export default function FinalDiagnostic() {
  return (
    <div
      style={{ backgroundImage: `url('/bg.png')` }}
      className='flex h-screen w-screen items-center justify-center overflow-hidden  bg-cover bg-no-repeat text-center font-bold uppercase tracking-widest'
    >
      <div>
        <div className='absolute left-[2rem] top-[2rem] h-[120px] w-[120px] cursor-pointer'>
          <img src='/logo.png' />
        </div>
      </div>
      <div>
        <Menu />
      </div>
      <div className='bg-primary flex items-center justify-center lg:left-[120px] xl:left-[150px]'>
        <div className='h-[80vh] w-[90vw] shadow-lg lg:w-[60vw]'>
          <h1 className='racking-widest ps-10 pt-10 text-left text-2xl font-medium uppercase'>{`recommandé pour vous`}</h1>
          <div className='px-20 pb-20 pt-6 '>
            <CardFinalDiagnostic />
          </div>
        </div>
      </div>
    </div>
  );
}
