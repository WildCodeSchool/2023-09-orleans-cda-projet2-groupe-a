import type { UseFormRegister } from 'react-hook-form';

import type { Inputs } from '@app/types';

export default function NamePart({
  register,
}: {
  readonly register: UseFormRegister<Inputs>;
}) {
  return (
    <>
      <h1 className='relative w-[300px] rotate-[-12deg] text-center text-xl uppercase sm:text-2xl md:bottom-[8%] lg:w-[350px]'>
        {'Choose a name for your cocktail :'}
      </h1>
      <input
        className='w-[200px] rotate-[-12deg] border-b-[2px] border-dashed'
        {...register('name', { required: true })}
      />
      <div className='relative bottom-[-30%] flex w-full items-center justify-end md:bottom-[-10%] lg:bottom-[-25%]'>
        <h2 className='md:text-md font-stroke text-light text-xl uppercase lg:text-2xl'>
          {'Shake it !'}
        </h2>
        <button type='submit'>
          <svg
            className='h-[100px] rotate-[15deg] md:h-[55px] lg:h-[100px]'
            fill='#F4F7F6'
            version='1.1'
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 0 463 463'
            xmlSpace='preserve'
          >
            <g>
              <g>
                <g>
                  <path
                    stroke='#0E0F0F'
                    strokeWidth='9'
                    d='M343.5,128h-8c-6.517,0-12.678-11.877-18.636-23.364C307.473,86.532,295.785,64,271.5,64H271V31.5
				C271,14.131,256.869,0,239.5,0h-16C206.131,0,192,14.131,192,31.5V64h-0.5c-24.285,0-35.973,22.532-45.364,40.636
				C140.178,116.123,134.017,128,127.5,128h-8c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h1.143
				c3.096,33.968,17.588,187.08,37.109,300.595C159.686,454.839,169.42,463,180.899,463h101.202
				c11.479,0,21.213-8.161,23.146-19.405C324.769,330.08,339.26,176.968,342.357,143h1.143c4.142,0,7.5-3.358,7.5-7.5
				C351,131.358,347.642,128,343.5,128z M207,31.5c0-9.098,7.402-16.5,16.5-16.5h16c9.098,0,16.5,7.402,16.5,16.5V32h-49V31.5z
				 M207,47h49v17h-49V47z M159.451,111.543C169.335,92.488,177.42,79,191.5,79h80c14.08,0,22.165,13.488,32.049,32.543
				c2.951,5.689,5.941,11.447,9.318,16.457H150.133C153.51,122.991,156.5,117.233,159.451,111.543z M290.464,441.053
				c-0.692,4.025-4.209,6.947-8.363,6.947H180.899c-4.154,0-7.671-2.922-8.363-6.947C156.998,350.699,144.65,235.011,138.751,175
				h185.498C318.35,235.009,306.004,350.69,290.464,441.053z M325.703,160H137.297c-0.671-7.032-1.206-12.789-1.591-17h191.589
				C326.91,147.211,326.374,152.968,325.703,160z'
                  />
                  <path
                    stroke='#0E0F0F'
                    strokeWidth='9'
                    d='M294.702,222.96c0.268,0.028,0.534,0.042,0.798,0.042c3.788,0,7.042-2.861,7.449-6.712
				c0.585-5.539,1.144-10.887,1.671-16.016c0.424-4.12-2.572-7.804-6.692-8.228c-4.124-0.425-7.805,2.572-8.229,6.692
				c-0.527,5.116-1.083,10.45-1.667,15.975C287.596,218.832,290.583,222.525,294.702,222.96z'
                  />
                  <path
                    stroke='#0E0F0F'
                    strokeWidth='9'
                    d='M279.348,350.936c0.336,0.045,0.67,0.067,1,0.067c3.702,0,6.923-2.741,7.425-6.51
				c3.951-29.644,7.886-61.999,11.696-96.164c0.459-4.118-2.506-7.827-6.622-8.286c-4.116-0.46-7.827,2.505-8.285,6.622
				c-3.799,34.06-7.721,66.307-11.657,95.846C272.358,346.617,275.242,350.389,279.348,350.936z'
                  />
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </>
  );
}
