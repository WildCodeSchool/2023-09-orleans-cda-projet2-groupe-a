export default function GreetsLogin() {
  return (
    <div className=' z-50 flex h-1/6 flex-col items-center gap-6 text-4xl'>
      <div className='animate-color-pulse hover:bg-light-purple m-2 rounded-[30px] border-[5px] border-transparent p-4 text-6xl font-bold transition-transform duration-500 ease-in-out hover:rotate-1  hover:scale-110 hover:animate-none hover:justify-normal hover:border-[5px] hover:border-black hover:bg-opacity-80 hover:text-pink-400'>
        <span>{"You're logged in!"}</span>
      </div>
    </div>
  );
}
