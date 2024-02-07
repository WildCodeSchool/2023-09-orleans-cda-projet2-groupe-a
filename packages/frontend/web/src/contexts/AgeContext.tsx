import { createContext, useEffect, useState } from 'react';

interface AgeProviderProps {
  readonly children: React.ReactNode;
}

type AgeProviderState = {
  isUnderAge: boolean;
  setIsUnderAge: (value: boolean) => void;
};

export const AgeContext = createContext<AgeProviderState | undefined | null>(
  null,
);

// export const AgeProvider: React.FC<AgeProviderProps> = ({
//     children
// }) => {
//   const [isUnderAge, setIsUnderAge] = useState(
//     window.sessionStorage.getItem('isUnderAge') === 'true' || null,
//   );

//   useEffect(() => {
//       const fetchData = async () => {
//           const response = await fetch('/auth/check');
//           const data = await response.json();
//           setIsUnderAge(data.isUnderAge);
//       };

//       fetchData();
//   }, []);

//   return (
//     <AgeContext.Provider value={isUnderAge}>{children}</AgeContext.Provider>
//   );
// };
