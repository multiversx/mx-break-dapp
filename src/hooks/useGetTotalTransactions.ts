import { useGetTotalTpsQuery } from '../queries/totalTps.query.ts';

export const useGetTotalTransactions = () => {
  const { data, isPending, error } = useGetTotalTpsQuery();

  return {
    totalTransactions: data ?? 0,
    pending: isPending,
    error,
  };
};
