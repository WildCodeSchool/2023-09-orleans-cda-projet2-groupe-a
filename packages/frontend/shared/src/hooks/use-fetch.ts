import { useEffect, useState } from 'react';

export function useFetch<Ingredient>(url: string): {
  data: Ingredient[] | undefined;
  isLoading: boolean;
} {
  const [data, setData] = useState<Ingredient[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (url === '') {
      setIsLoading(false);
      return;
    }
    const fetchData = () => {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          if (isMounted) {
            setData(result);
          }
        })
        .catch((error) => {
          console.error('Erreur de requête', error);
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading };
}
