import { useCallback, useEffect, useState } from 'react';
import { API_URL } from 'config';

export const useGetMaxTps = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [maxTps, setMaxTps] = useState<number>(0);

  const getLatestTps = useCallback(async () => {
    setPending(true);

    try {
      const response = await fetch(`${API_URL}/tps/max`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setError('Failed to get latest TPS');
        console.error('Failed to get latest TPS', response);
        return;
      }

      const data = await response.json();
      setPending(() => false);
      setMaxTps(() => data.tps);
    } catch (error) {
      setError('Error getting latest TPS');
      console.error('Error getting latest TPS', error);
    } finally {
      setPending(() => false);
    }
  }, []);

  useEffect(() => {
    getLatestTps();
    const interval = setInterval(() => {
      getLatestTps();
    }, 6000);

    return () => clearInterval(interval);
  }, [getLatestTps]);

  return {
    getLatestTps,
    maxTps,
    pending,
    error,
  };
};
