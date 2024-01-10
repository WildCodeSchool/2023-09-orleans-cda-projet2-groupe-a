// useFetch.js (ou useFetch.ts pour TypeScript)
import { useEffect, useState } from 'react';

export function useFetch<Ingredient>(url: string): {
  data: Ingredient[] | undefined;
  isLoading: boolean;
} {
  const [data, setData] = useState<Ingredient[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (url === '') {
      setIsLoading(false);
      return;
    }
    const fetchData = () => {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error('Erreur de requête', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
}
