import Menu from '../components/Menu';

export default function Diagnostic() {
  return (
    <div
      style={{ backgroundImage: `url('/bg.png')` }}
      className='flex h-screen w-screen items-center justify-center overflow-hidden  bg-cover bg-no-repeat text-center font-bold uppercase tracking-widest'
    >
      <div>
        <div className='absolute left-[2rem] top-[2rem] h-[120px] w-[120px] cursor-pointer'>
          <img src='/logo.png' />
        </div>
      </div>
      <div>
        <Menu />
      </div>
      <img className=' h-[450px] w-[450px]' src='/diagnostic.svg' />
    </div>
  );
}
