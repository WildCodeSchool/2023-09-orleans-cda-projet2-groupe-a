import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AgeProviderState = {
  isUnder18: boolean; // typage du contenu du context.
  setIsUnder18: (value: boolean) => void;
};

export const CurrentAgeContext = createContext<AgeProviderState | undefined>(
  undefined,
);

interface CurrentAgeProviderProps {
  readonly children: ReactNode;
}

export const AgeProvider = ({ children }: CurrentAgeProviderProps) => {
  const [isUnder18, setIsUnder18] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isUnder18: isUnder18,
      setIsUnder18: setIsUnder18,
    }),
    [isUnder18],
  );

  return (
    <CurrentAgeContext.Provider value={value}>
      {children}
    </CurrentAgeContext.Provider>
  );
};
