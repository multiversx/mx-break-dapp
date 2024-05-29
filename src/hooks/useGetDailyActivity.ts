import { useDailyActivity } from 'queries/dailyActivity.query';

export const useGetDailyActivity = () => {
  const { data, isLoading, isError } = useDailyActivity();

  return {
    dailyEntries: data?.filter((entry) => Boolean(entry.maxTpsBlockHash)),
    isLoading,
    isError,
  };
};
