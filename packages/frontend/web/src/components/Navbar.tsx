import {
  Heart,
  Home,
  LogIn,
  LogOut,
  Martini,
  Milk,
  Plus,
  UserCircle2,
  UserPlus,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

type NavbarContent = {
  name: string;
  url: string;
  icon: LucideIcon;
};

const navbarContentInfo: NavbarContent[] = [
  {
    name: 'Cocktails',
    url: '/cocktails',
    icon: Martini,
  },
  {
    name: 'Shaker',
    url: '/shaker',
    icon: Plus,
  },
  {
    name: 'Profile',
    url: '/profile',
    icon: UserCircle2,
  },
  {
    name: 'Favorite',
    url: '/favorites',
    icon: Heart,
  },
  {
    name: 'Community',
    url: '/community',
    icon: Users,
  },
  {
    name: 'Virgin',
    url: '/virgin',
    icon: Milk,
  },
];

export default function Navbar() {
  const [navbarContent, setNavbarContent] =
    useState<NavbarContent[]>(navbarContentInfo);
  const [color, setColor] = useState<string>('#000000');
  const [hover, setHover] = useState<string>('#000000');
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: 'POST',
      });
      if (response.ok) {
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Error while logging out');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setNavbarContent(() => [
        {
          name: 'Logout',
          url: '/',
          icon: LogOut,
        },
        ...navbarContentInfo,
      ]);
    } else {
      setNavbarContent(() => [
        {
          name: 'Login',
          url: '/login',
          icon: LogIn,
        },
        {
          name: 'Register',
          url: '/register',
          icon: UserPlus,
        },
        ...navbarContentInfo,
      ]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    switch (location.pathname) {
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
      default: {
        setColor('#000000');
        setHover('#000000');
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
      <div className='ms:p-0 group fixed bottom-0 z-[50] flex w-[325px] flex-row-reverse justify-between rounded-t-lg p-2 backdrop-blur-xl sm:right-[10px] sm:top-[18px] sm:h-[28px] sm:w-auto sm:justify-end sm:bg-transparent sm:backdrop-blur-0'>
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
        {navbarContent.map((content, index) => {
          return (
            <div
              key={content.name}
              className={`sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-[${
                (index + 1) * 100
              }ms] sm:group-hover:max-h-full sm:group-hover:opacity-100`}
            >
              {content.name === 'Logout' ? (
                <>
                  <content.icon
                    className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
                    onClick={() => handleLogout()}
                  />
                  <p
                    className={`text-[${color}] absolute max-h-0 opacity-0 transition-all peer-hover:max-h-full peer-hover:opacity-70 sm:right-[${
                      (index + 1) * 40
                    }px]`}
                  >
                    {content.name}
                  </p>
                </>
              ) : (
                <Link to={content.url}>
                  <content.icon
                    className={`peer h-7 w-7 cursor-pointer sm:my-auto sm:me-3 text-[${color}] hover:text-[${hover}]`}
                    {...(content.name === 'Logout' && {
                      onClick: handleLogout,
                    })}
                  />
                  <p
                    className={`text-[${color}] absolute max-h-0 opacity-0 transition-all peer-hover:max-h-full peer-hover:opacity-70 sm:right-[${
                      (index + 1) * 40
                    }px]`}
                  >
                    {content.name}
                  </p>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
