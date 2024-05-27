import { useCallback, useEffect, useState } from 'react';

export const useGetDailyActivity = () => {
  const [dailyEntries, setDailyEntries] = useState<
    {
      timestamp: number;
      tpsPerDay: number;
      maxTps: number;
      block: number;
    }[]
  >([]);

  const getDailyEntries = useCallback(async () => {
    const result = Promise.resolve([
      {
        timestamp: 1632883200000,
        tpsPerDay: 74088,
        maxTps: 74088,
        block: 321,
      },
      {
        timestamp: 1632969600000,
        tpsPerDay: 62432,
        maxTps: 62432,
        block: 322,
      },
      {
        timestamp: 1633056000000,
        tpsPerDay: 23887,
        maxTps: 23887,
        block: 323,
      },
      {
        timestamp: 1633142400000,
        tpsPerDay: 20887,
        maxTps: 20887,
        block: 324,
      },
      {
        timestamp: 1633228800000,
        tpsPerDay: 19887,
        maxTps: 19887,
        block: 325,
      },
      {
        timestamp: 1633315200000,
        tpsPerDay: 17887,
        maxTps: 17887,
        block: 326,
      },
      {
        timestamp: 1633401600000,
        tpsPerDay: 16887,
        maxTps: 16887,
        block: 327,
      },
      {
        timestamp: 1633488000000,
        tpsPerDay: 15887,
        maxTps: 15887,
        block: 328,
      },
      {
        timestamp: 1633574400000,
        tpsPerDay: 14887,
        maxTps: 14887,
        block: 329,
      },
    ]);

    setDailyEntries(await result);
    return result;
  }, []);

  useEffect(() => {
    getDailyEntries();
  }, [getDailyEntries]);

  return {
    getDailyEntries,
    dailyEntries,
  };
};
