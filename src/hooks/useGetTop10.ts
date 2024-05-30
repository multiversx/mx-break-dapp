import { useGetTop10BlocksQuery } from '../queries/top10blocks.query.ts';

export const useGetTop10 = () => {
  const { data, isLoading, isError } = useGetTop10BlocksQuery();

  return {
    top10: data,
    isLoading,
    isError,
  };
};
