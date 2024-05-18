import { TrendChart } from '../../components/TrendChart/TrendChart.tsx';
import { GaugeChart } from '../../components/GaugeChart/GaugeChart.tsx';

export const Home = () => {
  return (
    <div className="w-full p-1 mt-10 flex justify-center items-center my-auto flex-col gap-64">
      <div className="flex justify-center flex-col ">
        <GaugeChart />
      </div>
      <div className="w-full flex justify-center mx-auto text-xs">
        <TrendChart />
      </div>
    </div>
  );
};
