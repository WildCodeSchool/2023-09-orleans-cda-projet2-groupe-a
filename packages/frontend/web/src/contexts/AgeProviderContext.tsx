import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AgeProviderState = {
  obtainedBirthday: string | undefined; // typage du contenu du context.
  setObtainedBirthday: (value: string | undefined) => void;
};

export const AgeProviderContext = createContext<AgeProviderState | undefined>(
  undefined,
);

interface AgeProviderProps {
  readonly children: ReactNode;
}

export const AgeProvider = ({ children }: AgeProviderProps) => {
  const [obtainedBirthday, setObtainedBirthday] = useState<
    string | undefined
  >();

  const value = useMemo(
    () => ({
      obtainedBirthday: obtainedBirthday,
      setObtainedBirthday: setObtainedBirthday,
    }),
    [obtainedBirthday],
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
