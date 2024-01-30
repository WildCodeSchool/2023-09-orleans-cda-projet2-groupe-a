import { createContext, useContext, useMemo, useState } from 'react';

interface AnimationsProviderProps {
  readonly children: React.ReactNode;
}

type AnimationsProviderState = {
  isSubmitted: boolean; // typage du contenu du context.
  setIsSubmitted: (value: boolean) => void;
  isImageShown: boolean;
  setIsImageShown: (value: boolean) => void;
  isUnderAge: boolean;
  setIsUnderAge: (value: boolean) => void;
  isModalShown: boolean;
  setIsModalShown: (value: boolean) => void;
  isWow: boolean;
  setIsWow: (value: boolean) => void;
};

const AnimationsContext = createContext<AnimationsProviderState | undefined>(
  undefined,
);

export function useAnimations() {
  const context = useContext(AnimationsContext);
  if (!context) {
    throw new Error('useAnimations must be used within a AnimationsProvider');
  }
  return context;
}

export function AnimationsProvider({ children }: AnimationsProviderProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isImageShown, setIsImageShown] = useState(false);
  const [isUnderAge, setIsUnderAge] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isWow, setIsWow] = useState(false);

  const value = useMemo(
    () => ({
      isSubmitted,
      setIsSubmitted,
      isImageShown,
      setIsImageShown,
      isUnderAge,
      setIsUnderAge,
      isModalShown,
      setIsModalShown,
      isWow,
      setIsWow,
    }),
    [isSubmitted, isImageShown, isUnderAge, isModalShown, isWow],
  );

  return (
    <AnimationsContext.Provider value={value}>
      {children}
    </AnimationsContext.Provider>
  );
}
