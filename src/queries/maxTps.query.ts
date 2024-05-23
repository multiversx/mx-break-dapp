import axios, { AxiosError } from 'axios';
import { API_URL } from 'config';
import { useQuery } from '@tanstack/react-query';
import { Tick } from 'types/tick';

export const useGetMaxTpsQuery = () => {
  const pollInterval = 2000;
  const url = `${API_URL}/tps/max`;

  const queryFn = async <TData>() => {
    const { data } = await axios.get<TData>(url, {
      timeout: 3000,
    });
    return data;
  };

  const retry = (_failureCount: number, error: AxiosError) => {
    return error.response?.status === 404;
  };

  return useQuery<never, AxiosError, Tick>({
    queryKey: ['max-tps'],
    queryFn,
    retry,
    refetchInterval: pollInterval,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });
};
