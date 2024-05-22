import { Hero } from '../components/Hero';
import { TspGauge } from '../components/Gauge/TpsGauge.tsx';
import { TrendChart } from '../components/TrendChart/TrendChart.tsx';
import { TotalTransactions } from './Home/components/TotalTransactions.tsx';
import { MaxTps } from './Home/components/MaxTps.tsx';

export const New = () => {
  return (
    <>
      <Hero>
        <div className="container-page gap-3 text-center">
          <TspGauge />
        </div>

        <div className="w-full h-24 relative flex justify-end gap-4 px-2 mt-32">
          <TrendChart />
          <TotalTransactions />
          <MaxTps />
        </div>
      </Hero>
    </>
  );
};
