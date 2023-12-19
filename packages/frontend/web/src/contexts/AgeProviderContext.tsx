import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AgeProviderState = {
  isUnder18: boolean; // typage du contenu du context.
  setIsUnder18: (value: boolean) => void;
};

export const AgeProviderContext = createContext<AgeProviderState | undefined>(
  undefined,
);

interface AgeProviderProps {
  readonly children: ReactNode;
}

export const AgeProvider = ({ children }: AgeProviderProps) => {
  const [isUnder18, setIsUnder18] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isUnder18: isUnder18,
      setIsUnder18: setIsUnder18,
    }),
    [isUnder18],
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
