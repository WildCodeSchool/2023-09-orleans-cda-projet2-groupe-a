export default function Home() {
  return (
    <div className='flex items-center justify-center'>
      <div className='mt-28 h-[80vh] w-[80vw] overflow-hidden bg-transparent shadow-lg'>
        <div className='flex'>
          <div className='h-[80vh] w-[50%]'>
            <img
              className='m-auto mt-24 h-[450px] w-[450px]'
              src='/Logo2.svg'
            ></img>
          </div>
          <div className='h-[80vh] w-[50%] bg-black' />
        </div>
      </div>
    </div>
  );
}
