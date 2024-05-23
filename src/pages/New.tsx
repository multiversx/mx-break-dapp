import { Hero } from '../components/Hero';
import { TspGauge } from '../components/Gauge/TpsGauge';
import { TrendChart } from '../components/TrendChart/TrendChart';
import { TotalTransactions } from './Home/components/TotalTransactions';
import { MaxTps } from './Home/components/MaxTps';
import { SpamSection } from './New/components/SpamSection';

export const New = () => {
  return (
    <Hero>
      <div className="hero-gradient text-transparent bg-clip-text text-center text-3xl md:text-4xl font-medium tracking-tight mt-12 md:mt-4">
        Move fast and break chains
        <span className="hidden sm:block" />
        with Sovereign Speed
      </div>

      <div className="gap-3 text-center p-6 md:p-6">
        <TspGauge />
      </div>

      <div className="w-full relative md:flex md:flex-row md:justify-end md:gap-4 mt-0 md:mt-32">
        <TrendChart />
        <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-5 p-4 md:p-0">
          <TotalTransactions />
          <MaxTps />
        </div>
      </div>

      <div className="text-white text-center text-4xl md:text-6xl font-medium mt-20 md:mt-10">
        Will it break? Can you break it?
      </div>

      <div className="w-full p-4 flex justify-center">
        <div className="p-4 rounded-2xl bg-neutral-900 w-full md:max-w-[80%]">
          <SpamSection />
        </div>
      </div>
    </Hero>
  );
};
