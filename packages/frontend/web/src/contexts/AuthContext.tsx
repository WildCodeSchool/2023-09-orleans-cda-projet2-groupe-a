import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { User } from '@app/types';

type AuthProviderProps = {
  readonly children: React.ReactNode;
};

type AuthProviderState = {
  isLoggedIn: boolean; // typage du contenu du context.
  setIsLoggedIn: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const res = await fetch(`/api/auth/check`);
      const data = (await res.json()) as {
        // parenthèses autour d'await res.json() puis 'as' pour bien typer.
        ok: boolean;
        isLoggedIn: boolean;
        user: User | null;
        //isUnderAge
      };

      setIsLoggedIn(data.isLoggedIn);
      setUser(data.user);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
    }),
    [isLoggedIn],
  );

  return (
    <AuthProviderContext.Provider {...props} value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
};
