import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type BirthProviderState = {
  birthdate: string | undefined; // typage du contenu du context.
  setBirthdate: (value: string | undefined) => void;
};

export const BirthProviderContext = createContext<
  BirthProviderState | undefined
>(undefined);

interface BirthProviderProps {
  readonly children: ReactNode;
}

export const BirthProvider = ({ children }: BirthProviderProps) => {
  const [birthdate, setBirthdate] = useState<string | undefined>();

  const value = useMemo(
    () => ({
      birthdate: birthdate,
      setBirthdate: setBirthdate,
    }),
    [birthdate],
  );

  return (
    <BirthProviderContext.Provider value={value}>
      {children}
    </BirthProviderContext.Provider>
  );
};
export const useBirth = () => {
  const context = useContext(BirthProviderContext);

  if (!context) throw new Error('useAge must be used within a AgeProvider');

  return context;
};
