import { useEffect, useState } from 'react';

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchData = async (url: RequestInfo, controller: AbortController) => {
    const res = await fetch(url, {
      signal: controller.signal,
    });
    const info = await res.json();

    setData(info);
    setIsLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(url, controller).catch((error) => {
      setError(error);
      setIsLoading(false);
    });
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
}
