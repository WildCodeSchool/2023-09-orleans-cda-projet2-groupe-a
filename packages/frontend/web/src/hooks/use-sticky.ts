import { useEffect, useState } from 'react';

export default function useSticky(scrollOffset = 100) {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    console.log('coucou');

    const offset = window.scrollY;
    console.log(offset);

    setIsSticky(offset > scrollOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isSticky;
}
