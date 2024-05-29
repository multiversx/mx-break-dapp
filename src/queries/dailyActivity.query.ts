import axios, { AxiosError } from 'axios';
import { API_URL } from 'config';
import { useQuery } from '@tanstack/react-query';

export const useDailyActivity = () => {
  const pollInterval = 60 * 1000;
  const url = `${API_URL}/tps/daily-activity`;

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
      date: string;
      transactions: number;
      maxTps: number;
      maxTpsBlockHash: string;
    }[]
  >({
    queryKey: ['daily-activity'],
    queryFn,
    retry,
    refetchInterval: pollInterval,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
};
