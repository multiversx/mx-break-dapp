import axios, { AxiosError } from 'axios';
import { API_URL } from 'config';
import { useQuery } from '@tanstack/react-query';

export const useGetTotalTpsQuery = () => {
  const pollInterval = 1000;
  const url = `${API_URL}/tps/count`;

  const queryFn = async <TData>() => {
    const { data } = await axios.get<TData>(url, {
      timeout: 3000,
    });
    return data;
  };

  const retry = (_failureCount: number, error: AxiosError) => {
    return error.response?.status === 404;
  };

  return useQuery<never, AxiosError, number>({
    queryKey: ['count-tps'],
    queryFn,
    retry,
    refetchInterval: pollInterval,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });
};
