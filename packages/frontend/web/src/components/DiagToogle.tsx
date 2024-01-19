import { Link } from 'react-router-dom';

export default function DiagToggle() {
  return (
    <Link to='/diagnostic'>
      <div className='flex h-full w-full items-center justify-center'>
        <img
          className='max-h-full max-w-full'
          src='/diagnostic.svg'
          alt='Diagnostic Logo'
        />
      </div>
    </Link>
  );
}
