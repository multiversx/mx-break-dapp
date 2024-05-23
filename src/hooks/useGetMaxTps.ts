import { useGetMaxTpsQuery } from 'queries/maxTps.query';

export const useGetMaxTps = () => {
  const { data, isPending, error } = useGetMaxTpsQuery();

  return {
    maxTps: data?.tps ?? 0,
    pending: isPending,
    error,
  };
};
