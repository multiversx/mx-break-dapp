import { useEffect, useState } from 'react';
import { useGetHistoricalTpsQuery } from '../queries/historicalTps.query.ts';
import { Tick } from 'types/tick';

export const useGetHistoricalTps = () => {
  const [tps, setTps] = useState<Tick[]>([]);
  const { data, isPending, error } = useGetHistoricalTpsQuery();

  useEffect(() => {
    setTps((prevState) => {
      const latestTimestamp = prevState[prevState.length - 1]?.timestamp;

      if (!latestTimestamp) {
        return data ?? [];
      }

      const difference = data?.filter((x) => x.timestamp > latestTimestamp) ?? [];
      return [...prevState, ...difference];
    });
  }, [data]);

  return {
    tps,
    isPending,
    error,
  };
};
