import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AgeProviderProps {
  readonly children: React.ReactNode;
}

type AgeProviderState = {
  isUnderAge: boolean | null;
  setIsUnderAge: (value: boolean | null) => void;
};

export const AgeContext = createContext<AgeProviderState | undefined | null>(
  null,
);

export const AgeProvider: React.FC<AgeProviderProps> = ({
  children,
}: AgeProviderProps) => {
  const [isUnderAge, setIsUnderAge] = useState<boolean | null>(() => {
    const storedAge = window.sessionStorage.getItem('isUnderAge');
    return storedAge === 'true' ? true : storedAge === 'false' ? false : null;
  });

  useEffect(() => {
    window.sessionStorage.setItem('isUnderAge', String(isUnderAge));
  }, [isUnderAge]);

  const value = useMemo(
    () => ({ isUnderAge, setIsUnderAge }),
    [isUnderAge, setIsUnderAge],
  );

  return (
    <AgeContext.Provider value={value as AgeProviderState}>
      {children}
    </AgeContext.Provider>
  );
};

export const useAge = () => {
  const context = useContext(AgeContext);

  if (!context) throw new Error('useAge must be used within a AgeProvider');

  return context;
};
