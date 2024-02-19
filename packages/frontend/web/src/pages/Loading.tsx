import { Player } from '@lottiefiles/react-lottie-player';

export default function Loading() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='border-dark flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-full border-[10px] duration-700 ease-out hover:rotate-[360deg] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] md:border-[12px] lg:h-[800px] lg:w-[800px] lg:border-[14px] 2xl:h-[900px] 2xl:w-[900px]'>
        <div className='bg-gradient-animation bg-200 animate-gradient-x flex h-[200%] w-[200%] items-center justify-center bg-center'>
          <Player
            autoplay
            loop
            src='https://lottie.host/f9306c23-7e6f-46fc-82de-088be4b69e38/ilfqqIkvOu.json'
            className='h-full w-full lg:mx-auto lg:scale-150 lg:transform'
          />
        </div>
      </div>
    </div>
  );
}
