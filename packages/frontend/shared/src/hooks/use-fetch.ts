import { useEffect, useState } from 'react';

export function useFetch<Ingredient>(url: string): {
  data: Ingredient[] | undefined;
  isLoading: boolean;
} {
  const [data, setData] = useState<Ingredient[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur de requête', error);
        setIsLoading(false);
      }
    };

    if (url === '') {
      setIsLoading(false);
    } else {
      fetchData().catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading };
}
