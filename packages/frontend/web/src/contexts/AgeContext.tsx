import { createContext, useContext, useState } from 'react';

type AgeProviderProps = {
  readonly children: React.ReactNode;
};

const AgeContext = createContext<boolean | undefined>(undefined);

export function AgeProvider({ children }: AgeProviderProps) {
  const [isUnder18, setIsUnder18] = useState<boolean>(false);

  return (
    <AgeContext.Provider value={isUnder18}>{children}</AgeContext.Provider>
  );
}

export default AgeContext;
