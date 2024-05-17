import { useCallback, useEffect, useState } from 'react';
import { useAppProvider } from '../../../AppContext';
import { API_URL } from 'config';

export const useGetHistoricalTps = () => {
  const [tps, setTps] = useState<{ tps: number; timestamp: number }[]>([]);
  const { accessToken } = useAppProvider();

  const getHistoricalTps = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/tps/history/1h`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to get historical TPS', response);
        return;
      }

      const data = await response.json();
      setTps(() => data);
    } catch (error) {
      console.error('Error getting historical TPS', error);
    }
  }, [accessToken]);

  useEffect(() => {
    getHistoricalTps();
    const interval = setInterval(() => {
      getHistoricalTps();
    }, 30000);

    return () => clearInterval(interval);
  }, [getHistoricalTps]);

  return {
    getHistoricalTps,
    tps,
  };
};
