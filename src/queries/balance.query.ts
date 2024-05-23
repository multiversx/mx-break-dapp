import axios, { AxiosError } from 'axios';
import { API_URL } from 'config';
import { useQuery } from '@tanstack/react-query';
import { useAppProvider } from '../AppContext.tsx';
import { useEffect } from 'react';
import { AccountType } from '@multiversx/sdk-dapp/types';

export const useGetAccountQuery = () => {
  const { address, dispatch, actions } = useAppProvider();

  const pollInterval = 1000;
  const url = `${API_URL}/accounts/${address}`;

  const queryFn = async <TData>() => {
    const { data } = await axios.get<TData>(url, {
      timeout: 3000,
    });
    return data;
  };

  const retry = (_failureCount: number, error: AxiosError) => {
    return error.response?.status === 404;
  };

  const { data, isSuccess, error, ...rest } = useQuery<never, AxiosError, AccountType>({
    queryKey: ['account'],
    queryFn,
    retry,
    enabled: Boolean(address),
    refetchInterval: pollInterval,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && isSuccess) {
      dispatch({
        type: actions.UPDATE_BALANCE,
        balance: data.balance,
      });
      dispatch({
        type: actions.UPDATE_NONCE,
        nonce: data.nonce,
      });
    }

    if (error) {
      dispatch({
        type: actions.UPDATE_BALANCE,
        balance: 'Error...',
      });
    }
  }, [data, error, isSuccess]);

  return {
    data,
    isSuccess,
    error,
    ...rest,
  };
};
