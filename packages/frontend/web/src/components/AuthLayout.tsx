import Diagnostic from '@/pages/Diagnostic';
import Inscription from '@/pages/Inscription';

import { useAuth } from '../contexts/AuthContext';
import Login from './auth/Login';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, display the cards
  if (isLoggedIn) {
    return <Diagnostic />;
  }

  return <Login />;
}
