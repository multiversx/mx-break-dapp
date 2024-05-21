import { useCallback, useEffect, useState } from 'react';
import { useAppProvider } from '../../../AppContext';
import { API_URL } from 'config';
import { getAccessToken } from 'helpers/accessToken/getAccessToken';

export const useGetHistoricalTps = () => {
  const [tps, setTps] = useState<{ tps: number; timestamp: number }[]>([]);
  const { accessToken, address, encrypted } = useAppProvider();

  const getHistoricalTps = useCallback(async () => {
    if (!address) {
      console.error('No address found');
      return;
    }

    if (!encrypted) {
      console.error('No encrypted wallet found');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const bearerToken = accessToken || (await getAccessToken(address, encrypted));

    try {
      const response = await fetch(`${API_URL}/tps/history/1h`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${accessToken}`,
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
  }, [accessToken]);

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
