export default function NotFound() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center'>
      <h1 className='font-stroke text-light xxs:text-xl my-4 p-2 text-center md:text-3xl'>
        {'404 - Page not Found'}
      </h1>
      <div className='w-2/3'>
        <img
          className='object-fit h-auto w-full items-center justify-center'
          src='/blurring-glass.jpg'
          alt='Image error 404'
        />
      </div>
      <p className='font-stroke text-light xxs:mb-[5px] xxs:text-xl p-3 text-center sm:mb-[2px] md:text-3xl'>
        {
          "Sorry, the page you're looking for couldn't be found. Try something else..."
        }
      </p>
    </div>
  );
}
