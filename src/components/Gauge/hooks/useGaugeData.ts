import { useGetLatestTps } from 'hooks/useGetLatestTps';
import { useGetMaxTps } from 'hooks/useGetMaxTps';
import { useMemo } from 'react';

export const GAUGE_MAX_VALUE = 60_000;

export const useGaugeData = () => {
  const { tps } = useGetLatestTps();
  const { maxTps } = useGetMaxTps();

  const guardedTpsValue = useMemo(() => {
    if (tps < 0) {
      return 0;
    }

    if (tps > GAUGE_MAX_VALUE) {
      return GAUGE_MAX_VALUE;
    }

    return tps;
  }, [tps]);

  const guardedMaxTps = useMemo(() => {
    if (maxTps <= 0) {
      return 1;
    }

    if (maxTps > GAUGE_MAX_VALUE) {
      return GAUGE_MAX_VALUE;
    }

    return maxTps;
  }, [maxTps]);

  return {
    tps: guardedTpsValue,
    maxTps,
    guardedMaxTps,
  };
};
