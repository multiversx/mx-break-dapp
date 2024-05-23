import { useCallback, useEffect, useState } from 'react';
import { API_URL } from 'config';

export const useGetLatestTps = () => {
  const [tps, setTps] = useState<number>(0);

  const getLatestTps = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/tps/latest/30s`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to get latest TPS', response);
        return;
      }

      const data = await response.json();
      setTps(() => data.tps);
    } catch (error) {
      console.error('Error getting latest TPS', error);
    }
  }, []);

  useEffect(() => {
    getLatestTps();
    const interval = setInterval(() => {
      getLatestTps();
    }, 1000);

    return () => clearInterval(interval);
  }, [getLatestTps]);

  return {
    getLatestTps,
    tps,
  };
};
