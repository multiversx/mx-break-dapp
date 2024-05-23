import { useGetLatestTpsQuery } from '../queries/latestTps.query';

export const useGetLatestTps = () => {
  const { data, isPending, error } = useGetLatestTpsQuery();

  return {
    tps: data?.tps ?? 0,
    pending: isPending,
    error,
  };
};
