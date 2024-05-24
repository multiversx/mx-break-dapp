import { useGetMaxTpsQuery } from 'queries/maxTps.query';
import { REFERENCE_MAX_TPS } from '../config';

export const useGetMaxTps = () => {
  const { data, isPending, error } = useGetMaxTpsQuery();

  return {
    maxTps: Math.max(REFERENCE_MAX_TPS, data?.tps ?? 0),
    pending: isPending,
    error,
  };
};
