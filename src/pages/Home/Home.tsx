import { TrendChart } from '../../components/TrendChart/TrendChart';
import { useGetLatestTps } from '../../hooks/useGetLatestTps';
import { Speedometer } from '../../components/Speedometer/Speedometer';

export const Home = () => {
  const { tps } = useGetLatestTps();

  return (
    <div className="w-full mt-10 flex p-6 my-auto flex-col gap-12">
      <div className="flex gap-12 flex-wrap">
        <div className="max-w-sm w-full rounded-lg shadow dark:bg-neutral-950 p-4 md:p-6 flex">
          <div className="flex justify-between">
            <div className="flex-1">
              <h5 className="leading-none text-3xl font-bold dark:text-teal pb-2">
                TPS {Math.round(tps)}
              </h5>
              <p className="font-normal text-xs dark:text-teal">in the last 30 seconds</p>
            </div>
          </div>
        </div>
        <div className="max-w-sm w-full rounded-lg shadow dark:bg-neutral-950 p-4 md:p-6 flex">
          <Speedometer speed={tps} />
        </div>
      </div>

      <div className="w-full flex justify-center mx-auto text-xs">
        <TrendChart />
      </div>
    </div>
  );
};
