import { useGetLatestTps } from './hooks/useGetLatestTps';
import { TrendChart } from '../../components/LineChart/TrendChart.tsx';

export const Home = () => {
  const { tps } = useGetLatestTps();

  console.log('tps', tps);

  return (
    <div className="w-full p-1 mt-10 flex justify-center items-center my-auto flex-col gap-64">
      <div className="flex justify-center flex-col ">
        <div>Transactions/sec</div>
        <div>{tps ? <span>{Math.round(tps)}</span> : <span>Loading...</span>}</div>
      </div>
      <div className="w-full flex justify-center mx-auto text-xs">
        <TrendChart />
      </div>
    </div>
  );
};
