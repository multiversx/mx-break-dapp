import { useCallback, useEffect, useState } from 'react';
import { useAppProvider } from '../../../AppContext';
import { API_URL } from 'config';
import { getAccessToken } from 'helpers/accessToken/getAccessToken';

export const useGetLatestTps = () => {
  const [tps, setTps] = useState<number>(0);
  const { accessToken, address, encrypted } = useAppProvider();

  const getLatestTps = useCallback(async () => {
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
      const response = await fetch(`${API_URL}/tps/latest/30s`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${bearerToken}`,
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
  }, [accessToken]);

  useEffect(() => {
    getLatestTps();
    const interval = setInterval(() => {
      getLatestTps();
    }, 30000);

    return () => clearInterval(interval);
  }, [getLatestTps]);

  return {
    getLatestTps,
    tps,
  };
};
