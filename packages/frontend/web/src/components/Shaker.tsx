import Confetti from 'react-confetti';

export default function Shaker() {
  return (
    <div className='absolute top-0 z-[100] bg-black bg-opacity-60 shadow-lg'>
      <Confetti className='h-[full] w-[full]' />
      <div className='flex h-screen w-screen items-center justify-center'>
        <img
          src='/shaker.png'
          className='animate-jump-shaking h-[700px]'
          alt='Shake2'
        />
      </div>
    </div>
  );
}
