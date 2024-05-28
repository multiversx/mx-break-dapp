import { useGetTop10BlocksQuery } from '../queries/top10blocks.query.ts';

export const useGetTop10 = () => {
  const { data, isLoading, isError } = useGetTop10BlocksQuery();
  const first3colors = ['text-red-300', 'text-green-200', 'text-blue-300'];

  return {
    top10: data,
    first3colors,
    isLoading,
    isError,
  };
};
