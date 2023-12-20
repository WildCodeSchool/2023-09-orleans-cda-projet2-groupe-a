import {
  Heart,
  Home,
  Martini,
  Milk,
  Plus,
  UserCircle2,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [color, setColor] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/': {
        setColor('black');
        break;
      }
      case /^\/profile\/\d+$/: {
        setColor('#03454E');
        break;
      }
      case '/shaker': {
        setColor('black');
        break;
      }
      case '/virgin': {
        setColor('orange');
        break;
      }
      case '/community': {
        setColor('purple');
        break;
      }
      case '/cocktails': {
        setColor('green');
        break;
      }
      case '/favorites': {
        setColor('pink');
        break;
      }
    }
  }, [location.pathname]);

  return (
    <div className='group fixed right-[20px] top-[25px] z-[100] hover:flex sm:flex sm:flex-row-reverse sm:justify-end'>
      <Link to='/'>
        <Home
          color={`${color}`}
          className='my-auto me-3 h-7 w-7 cursor-pointer'
        />
      </Link>
      <div className='max-h-0 opacity-0 transition-all duration-[100ms] group-hover:max-h-full group-hover:opacity-100'>
        <Link to='/community'>
          <Users
            color={`${color}`}
            className='my-auto me-3 h-7 w-7 cursor-pointer'
          />
        </Link>
      </div>
      <div className='max-h-0 opacity-0 transition-all duration-[200ms] group-hover:max-h-full group-hover:opacity-100'>
        <Link to='/favorites'>
          <Heart
            color={`${color}`}
            className='my-auto me-3 h-7 w-7 cursor-pointer'
          />
        </Link>
      </div>
      <div className='max-h-0 opacity-0 transition-all duration-[300ms] group-hover:max-h-full group-hover:opacity-100'>
        <Link to='/profile/1'>
          <UserCircle2
            color={`${color}`}
            className='my-auto me-3 h-7 w-7 cursor-pointer'
          />
        </Link>
      </div>
      <div className='max-h-0 opacity-0 transition-all duration-[400ms] group-hover:max-h-full group-hover:opacity-100'>
        <Link to='/virgin'>
          <Milk
            color={`${color}`}
            className='my-auto me-3 h-7 w-7 cursor-pointer'
          />
        </Link>
      </div>
      <div className='max-h-0 opacity-0 transition-all duration-[500ms] group-hover:max-h-full group-hover:opacity-100'>
        <Link to='/cocktails'>
          <Martini
            color={`${color}`}
            className='my-auto me-3 h-7 w-7 cursor-pointer'
          />
        </Link>
      </div>
      <div className='max-h-0 opacity-0 transition-all duration-[600ms] group-hover:max-h-full group-hover:opacity-100'>
        <Link to='/shaker'>
          <Plus
            color={`${color}`}
            className='my-auto me-3 h-7 w-7 cursor-pointer'
          />
        </Link>
      </div>
    </div>
  );
}
