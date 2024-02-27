import { Player } from '@lottiefiles/react-lottie-player';

export default function Loading() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='border-dark flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-full border-[4px] shadow-lg duration-700 ease-out hover:rotate-[360deg] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] md:border-[8px] lg:h-[450px] lg:w-[450px]'>
        <div className='bg-gradient-animation bg-200 animate-gradient-x flex h-full w-full items-center justify-center bg-center'>
          <Player
            autoplay
            loop
            src='https://lottie.host/f9306c23-7e6f-46fc-82de-088be4b69e38/ilfqqIkvOu.json'
            className='h-[300px] w-[300px] lg:mx-auto lg:scale-150 lg:transform'
          />
        </div>
      </div>
    </div>
  );
}
