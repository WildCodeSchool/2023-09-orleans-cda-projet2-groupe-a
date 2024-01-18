import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

type AuthProviderProps = {
  readonly children: React.ReactNode;
};

type AuthProviderState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoading: boolean;
  userId: number | undefined;
};

// Create an authentification context
const authProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

export default function AuthContext({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | undefined>();

  // Verify if the user is logged in
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          method: 'GET',
          signal: controller.signal, // pass the signal in the request for aborting the request
          credentials: 'include', // include cookies in the request
        });

        // Convert the response to json
        const data = (await res.json()) as {
          isLoggedIn: boolean;
          userId: number;
        };

        setIsLoggedIn(data.isLoggedIn);
        setUserId(data.userId);
      } catch (error) {
        throw new Error(`Failed to verify auth: ${String(error)}`);
      } finally {
        // Stop the loading if the request is loaded
        setIsLoading(false);
      }
    };

    // Call the function fetchData
    fetchData().catch((error) => {
      throw new Error(`Failed to verify auth: ${String(error)}`);
    });

    // Abort the request if the component is unmounted
    return () => {
      controller.abort();
    };
  }, []);

  // Memoize the values
  const value = useMemo(() => {
    return {
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      userId,
    };
  }, [isLoggedIn, isLoading, userId]);

  return (
    <authProviderContext.Provider {...props} value={value}>
      {children}
    </authProviderContext.Provider>
  );
}

// Custom hook to use the authentification context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(authProviderContext);

  // If the hook is used outside of the login
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
