export default function NotFound() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center'>
      <h1 className='font-stroke text-light mt-10 p-3 text-center text-3xl'>
        {'404 - Page not Found'}
      </h1>
      <img
        className='w-3/4 items-center justify-center'
        src='./blurring-glass.jpg'
        alt='Image error 404'
      />
      <p className='font-stroke text-light xxs:mb-[5px] xxs:text-xl p-3 text-center sm:text-3xl'>
        {
          "Sorry, the page you're looking for couldn't be found. Try something else..."
        }
      </p>
    </div>
  );
}
