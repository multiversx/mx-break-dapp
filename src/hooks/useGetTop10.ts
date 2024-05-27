import { useCallback, useEffect, useState } from 'react';

export const useGetTop10 = () => {
  const [top10, setTop10] = useState<
    {
      rank: number;
      maxTps: number;
      block: number;
    }[]
  >([]);
  const first3colors = ['text-red-300', 'text-green-200', 'text-blue-300'];

  const getTop10 = useCallback(async () => {
    const result = Promise.resolve([
      {
        rank: 1,
        maxTps: 74088,
        block: 321,
      },
      {
        rank: 2,
        maxTps: 62432,
        block: 322,
      },
      {
        rank: 3,
        maxTps: 23887,
        block: 323,
      },
      {
        rank: 4,
        maxTps: 20887,
        block: 324,
      },
      {
        rank: 5,
        maxTps: 19887,
        block: 325,
      },
      {
        rank: 6,
        maxTps: 17887,
        block: 326,
      },
      {
        rank: 7,
        maxTps: 16887,
        block: 327,
      },
      {
        rank: 8,
        maxTps: 15887,
        block: 328,
      },
      {
        rank: 9,
        maxTps: 14887,
        block: 329,
      },
      {
        rank: 10,
        maxTps: 13887,
        block: 330,
      },
    ]);

    setTop10(await result);
    return result;
  }, []);

  useEffect(() => {
    getTop10();
  }, [getTop10]);

  return {
    getTop10,
    top10,
    first3colors,
  };
};
