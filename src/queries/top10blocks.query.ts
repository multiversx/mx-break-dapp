import axios, { AxiosError } from 'axios';
import { API_URL } from 'config';
import { useQuery } from '@tanstack/react-query';

export const useGetTop10BlocksQuery = () => {
  const pollInterval = 60 * 1000;
  const url = `${API_URL}/tps/top-blocks`;

  const queryFn = async <TData>() => {
    const { data } = await axios.get<TData>(url, {
      timeout: 3000,
    });
    return data;
  };

  const retry = (_failureCount: number, error: AxiosError) => {
    return error.response?.status === 404;
  };

  return useQuery<
    never,
    AxiosError,
    {
      hash: string;
      nonce: number;
      txCount: number;
    }[]
  >({
    queryKey: ['top-10-blocks'],
    queryFn,
    retry,
    refetchInterval: pollInterval,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
};
