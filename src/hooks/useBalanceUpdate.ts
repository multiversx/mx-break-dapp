import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppProvider } from '../AppContext';
import { API_URL } from '../config';

export const useBalanceUpdate = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const timeout = useRef<NodeJS.Timeout>();

  const { address, dispatch, actions } = useAppProvider();

  const updateBalance = useCallback(async () => {
    if (!address) {
      console.warn('Address is not defined');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/accounts/${address}`);
      const data = await response.json();
      setBalance(data.balance);
      dispatch({
        type: actions.UPDATE_BALANCE,
        balance: data.balance,
      });
      dispatch({
        type: actions.UPDATE_NONCE,
        nonce: data.nonce,
      });
    } catch (e) {
      setError(e);
      dispatch({
        type: actions.UPDATE_BALANCE,
        balance: 'Error...',
      });
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    updateBalance();

    if (timeout.current) {
      clearInterval(timeout.current);
    }
    timeout.current = setInterval(() => {
      updateBalance();
    }, 6000);

    return () => clearInterval(timeout.current);
  }, [updateBalance]);

  return { balance, loading, error, updateBalance };
};
