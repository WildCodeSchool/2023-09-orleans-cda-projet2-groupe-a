import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthProviderProps = {
  readonly children: React.ReactNode;
};

type AuthProviderState = {
  isLoggedIn: boolean; // typage du contenu du context.
  setIsLoggedIn: (value: boolean) => void;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const res = await fetch(`/api/auth/check`);
      const data = (await res.json()) as {
        // parenthèses autour d'await res.json() puis 'as' pour bien typer.
        ok: boolean;
        isLoggedIn: boolean;
        //isUnderAge
      };

      setIsLoggedIn(data.isLoggedIn);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
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
