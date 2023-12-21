import { Plus } from 'lucide-react';

export default function FilterBar() {
  return (
    <div className='mt-12'>
      <p className='font-stroke text-light ps-[5rem] text-[1.2rem] uppercase'>{`filter by`}</p>
      <div className='mt-10 flex justify-center'>
        <div className='border-dark bg-card-green mx-auto w-[95vw] rounded-sm border-[3px] p-8 uppercase'>
          <div className='grid h-full w-full grid-cols-7'>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`alcohol`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`ingredients`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`rank`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`flavour`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`kcal`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 flex h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`complexity`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`strength`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
