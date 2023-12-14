import { useEffect, useRef, useState } from 'react';

export default function UseClosePopUp() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popUp = useRef<HTMLDivElement>(null);

  // Closed pop-up outside the component
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popUp.current &&
        !popUp.current.contains(event.target as Node) &&
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

  return { isOpen, setIsOpen, popUp };
}
