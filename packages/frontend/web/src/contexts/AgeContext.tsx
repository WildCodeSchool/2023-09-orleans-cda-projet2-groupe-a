import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AgeProviderState = {
  birthdate: string | undefined; // typage du contenu du context.
  setBirthdate: (value: string | undefined) => void;
};

export const AgeProviderContext = createContext<AgeProviderState | undefined>(
  undefined,
);

interface AgeProviderProps {
  readonly children: ReactNode;
}

export const AgeProvider = ({ children }: AgeProviderProps) => {
  const [birthdate, setBirthdate] = useState<string | undefined>();

  const value = useMemo(
    () => ({
      birthdate: birthdate,
      setBirthdate: setBirthdate,
    }),
    [birthdate],
  );

  return (
    <AgeProviderContext.Provider value={value}>
      {children}
    </AgeProviderContext.Provider>
  );
};
export const useAge = () => {
  const context = useContext(AgeProviderContext);

  if (!context) throw new Error('useAge must be used within a AgeProvider');

  return context;
};
