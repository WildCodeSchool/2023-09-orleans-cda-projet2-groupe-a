import DotLoader from 'react-spinners/DotLoader';

export default function Loading() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='-translate-y-1/2'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <DotLoader size={50} color='#3f436a' speedMultiplier={1.7} />
          <p className='font-base text-secondary text-center text-xl'>{`Loading...`}</p>
        </div>
      </div>
    </div>
  );
}
