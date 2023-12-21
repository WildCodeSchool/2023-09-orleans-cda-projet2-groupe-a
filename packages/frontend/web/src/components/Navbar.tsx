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
  const [hover, setHover] = useState<string>();
  const [categorie, setCategorie] = useState('');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/': {
        setColor('#000000');
        setHover('#000000');
        break;
      }
      case '/shaker': {
        setColor('#000000');
        setHover('#000000');
        break;
      }
      case '/virgin': {
        setColor('#A4440A');
        setHover('#663416');
        break;
      }
      case '/community': {
        setColor('#800A91');
        setHover('#4E0758');
        break;
      }
      case '/cocktails': {
        setColor('#036749');
        setHover('#02432F');
        break;
      }
      case '/favorites': {
        setColor('#FEADB3');
        setHover('#7D244E');
        break;
      }
    }

    const matchProfile = location.pathname.match(/^\/profile\/(\d+)$/);
    if (matchProfile) {
      setColor('#03454E');
      setHover('#101D1F');
    }

    const matchDetails = location.pathname.match(/^\/details\/(\d+)$/);
    if (matchDetails) {
      setColor('#8A741F');
      setHover('#55460C');
    }
  }, [location.pathname]);

  return (
    <div className='flex justify-center'>
      <div className='ms:p-0 group fixed top-[95%] z-[100] flex w-[325px] flex-row-reverse justify-between rounded-t-lg p-2 backdrop-blur-xl sm:right-[10px] sm:top-[18px] sm:w-auto sm:justify-end sm:bg-transparent sm:backdrop-blur-0'>
        <Link to='/'>
          <Home
            className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
          />
          <p
            className={`hidden sm:block text-[${color}] opacity-0 sm:absolute sm:right-[12px] sm:max-h-0 sm:transition-all sm:peer-hover:max-h-full sm:peer-hover:opacity-70`}
          >
            {'Home'}
          </p>
        </Link>
        <div className='sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-[100ms] sm:group-hover:max-h-full sm:group-hover:opacity-100'>
          <Link to='/cocktails'>
            <Martini
              className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
            />
            <p
              className={`text-[${color}] absolute max-h-0 opacity-0 transition-all peer-hover:max-h-full peer-hover:opacity-70 sm:sm:right-[25px]`}
            >
              {'Cocktails'}
            </p>
          </Link>
        </div>
        <div className='sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-[200ms] sm:group-hover:max-h-full sm:group-hover:opacity-100'>
          <Link to='/shaker'>
            <Plus
              className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
            />
            <p
              className={`text-[${color}] absolute  max-h-0 opacity-0 transition-all peer-hover:max-h-full peer-hover:opacity-70 sm:sm:right-[75px]`}
            >
              {'Shaker'}
            </p>
          </Link>
        </div>
        <div className='sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-[300ms] sm:group-hover:max-h-full sm:group-hover:opacity-100'>
          <Link to='/profile/1'>
            <UserCircle2
              className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
            />
            <p
              className={`text-[${color}] absolute  max-h-0 opacity-0 transition-all peer-hover:max-h-full peer-hover:opacity-70 sm:sm:right-[120px]`}
            >
              {'Profile'}
            </p>
          </Link>
        </div>
        <div className='sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-[400ms] sm:group-hover:max-h-full sm:group-hover:opacity-100'>
          <Link to='/favorites'>
            <Heart
              className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
            />
            <p
              className={`text-[${color}] absolute max-h-0 opacity-0 transition-all peer-hover:max-h-full peer-hover:opacity-70 sm:right-[150px]`}
            >
              {'Favorite'}
            </p>
          </Link>
        </div>
        <div className='sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-[500ms] sm:group-hover:max-h-full sm:group-hover:opacity-100'>
          <Link to='/community'>
            <Users
              className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
            />
            <p
              className={`text-[${color}] absolute max-h-0 opacity-0 transition-all peer-hover:max-h-full peer-hover:opacity-70 sm:right-[175px]`}
            >
              {'Community'}
            </p>
          </Link>
        </div>
        <div className='sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-[600ms] sm:group-hover:max-h-full sm:group-hover:opacity-100'>
          <Link to='/virgin'>
            <Milk
              className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
            />
            <p
              className={`text-[${color}] absolute max-h-0 opacity-0 transition-all peer-hover:max-h-full peer-hover:opacity-70 sm:right-[245px]`}
            >
              {'Virgin'}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
