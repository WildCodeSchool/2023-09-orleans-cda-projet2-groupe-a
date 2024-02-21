import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { User } from '@app/types';

import { useAge } from './AgeContext';

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
  const { setIsUnderAge } = useAge();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const res = await fetch(`/api/auth/check`);
      const data = (await res.json()) as {
        // parenthèses autour d'await res.json() puis 'as' pour bien typer.
        ok: boolean;
        isLoggedIn: boolean;
        isUnderAge: boolean;
        user: User | null;
      };

      setIsLoggedIn(data.isLoggedIn);
      setIsUnderAge(data.isUnderAge);
      setUser(data.user);
    })();

    return () => {
      abortController.abort();
    };
  }, [setIsUnderAge]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      setIsUnderAge,
      user,
      setUser,
    }),
    [isLoggedIn, user, setIsUnderAge],
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
