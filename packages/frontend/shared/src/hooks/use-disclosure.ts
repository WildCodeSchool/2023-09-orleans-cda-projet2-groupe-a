import { useCallback, useState } from 'react';

function useDisclosure(defaultState: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultState);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle,
  };
}

export { useDisclosure };
