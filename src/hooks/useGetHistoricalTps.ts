import { useCallback, useEffect, useState } from 'react';
import { useAppProvider } from '../AppContext.tsx';
import { API_URL } from 'config';

export const useGetHistoricalTps = () => {
  const [tps, setTps] = useState<{ tps: number; timestamp: number }[]>([]);
  const { accessToken, address, encrypted } = useAppProvider();

  const getHistoricalTps = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/tps/history/1h`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to get historical TPS', response);
        return;
      }

      const data = (await response.json()) as { tps: number; timestamp: number }[];
      setTps((prevState) => {
        const latestTimestamp = prevState[prevState.length - 1]?.timestamp;

        if (!latestTimestamp) return data;

        const difference = data.filter((x) => x.timestamp > latestTimestamp);
        return [...prevState, ...difference];
      });
    } catch (error) {
      console.error('Error getting historical TPS', error);
    }
  }, [accessToken, address, encrypted]);

  useEffect(() => {
    getHistoricalTps();
    const interval = setInterval(() => {
      getHistoricalTps();
    }, 10000);

    return () => clearInterval(interval);
  }, [getHistoricalTps]);

  return {
    getHistoricalTps,
    tps,
  };
};
