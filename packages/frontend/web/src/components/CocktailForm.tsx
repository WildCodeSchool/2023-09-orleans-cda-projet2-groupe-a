import { Upload } from 'lucide-react';

export default function CocktailForm() {
  return (
    <div>
      <div className='border-dark bg-pastel-yellow relative m-auto mb-20 h-[26rem] w-[80%] rounded-sm border-[3px] uppercase sm:flex-wrap'>
        <h3 className='mt-6 text-center uppercase'>{`change me !!!`}</h3>
        <div className='bg-light-beige border-dark m-auto  mt-10 h-[60%] w-[85%] rounded-sm border-2' />
        <div className='my-6 me-6 ms-8 flex justify-between'>
          <Upload
            color='#0E0F0F'
            className='stroke-4 my-auto me-3 h-7 w-7 cursor-pointer'
            style={{ strokeWidth: '3' }}
          />
          <div className='flex items-center'>
            <p className='uppercase'>{`shake it !`}</p>
            <img
              src='shaker.svg'
              alt='shaker'
              className=' my-auto h-10 w-10 rotate-[30deg] cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
