import { useCallback, useEffect, useState } from 'react';
import { API_URL } from 'config';

export const useGetTotalTransactions = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [totalTransactions, setTotalTransactions] = useState<number>(0);

  const getTotalTransactions = useCallback(async () => {
    setPending(true);
    try {
      const response = await fetch(`${API_URL}/tps/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to get total transactions', response);
        setError('Failed to get total transactions');
        return;
      }

      const data = await response.json();
      setPending(() => false);
      setTotalTransactions(() => data);
    } catch (error) {
      setError('Error getting total transactions');
      console.error('Error getting total transactions', error);
    } finally {
      setPending(() => false);
    }
  }, []);

  useEffect(() => {
    getTotalTransactions();
    const interval = setInterval(() => {
      getTotalTransactions();
    }, 1000);

    return () => clearInterval(interval);
  }, [getTotalTransactions]);

  return {
    getTotalTransactions,
    totalTransactions,
    pending,
    error,
  };
};
