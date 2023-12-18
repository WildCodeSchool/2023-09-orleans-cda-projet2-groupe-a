// import { useEffect, useRef, useState } from 'react';
// export default function useOutsideClick() {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const ref = useRef<HTMLDivElement>(null);
//   // Closed pop-up outside the component
//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (
//         ref.current &&
//         !ref.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [isOpen]);
//   return { isOpen, setIsOpen, ref };
// }
import { useEffect, useRef, useState } from 'react';

export default function useOutsideClick<T extends HTMLElement>() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const refEl = useRef<T | null>(null);

  // Closed pop-up outside the component
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        refEl.current &&
        !refEl.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, refEl };
}
