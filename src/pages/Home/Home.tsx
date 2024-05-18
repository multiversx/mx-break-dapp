import { TrendChart } from '../../components/TrendChart/TrendChart.tsx';
import { useGetLatestTps } from './hooks/useGetLatestTps.ts';

export const Home = () => {
  const { tps } = useGetLatestTps();
  console.log('tps', tps);

  return (
    <div className="w-full p-1 mt-10 flex justify-center items-center my-auto flex-col gap-12">
      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
              TPS {tps > 0 ? tps.toFixed(2) : tps}
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              in the last 30 seconds
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mx-auto text-xs">
        <TrendChart />
      </div>
    </div>
  );
};
