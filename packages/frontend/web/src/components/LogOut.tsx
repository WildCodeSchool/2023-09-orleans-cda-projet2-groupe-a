import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

type LogOutProps = {
  readonly className?: string;
};

export const LogOut: FC<LogOutProps> = ({ className }) => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (response.ok) {
        // Si la déconnexion a réussi, mettre à jour l'état
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <button type='button' className={className} onClick={handleLogout}>
      {'Log out'}
    </button>
  );
};
