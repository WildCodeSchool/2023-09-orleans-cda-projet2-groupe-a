import { useAuth } from '../contexts/AuthContext';
import HomeDiagnostic from './HomeDiagnostic';
import Login from './auth/Login';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, display the cards
  if (isLoggedIn) {
    return <HomeDiagnostic />;
  }

  return <Login />;
}
