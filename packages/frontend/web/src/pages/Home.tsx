import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        gap: '1rem',
      }}
    >
      <span className='text-red-900'>{'Coucou'}</span>
      <span>{'You are connected'}</span>
    </div>
  );
}
