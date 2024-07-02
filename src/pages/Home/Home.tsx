import { Top10 } from './components/Top10';
import { DailyActivity } from './components/DailyActivity.tsx';
import { MissionHold } from './components/MissionHold';

export const Home = () => {
  return (
    <>
      <div className="relative">
        <MissionHold />
      </div>
      <div className="flex items-center justify-center h-full mt-32 mb-12">
        <div className="flex w-full flex-col items-center overflow-hidden">
          <div className="z-[1] mx-auto flex w-full flex-col items-center gap-10 md:gap-16">
            {/* <div className="font-roobert-medium hero-gradient text-transparent bg-clip-text text-center text-3xl md:leading-tight md:text-6xl tracking-tight mt-12 md:mt-4">
              Move fast and break chains <span className="hidden sm:block" />
              with Sovereign Speed
            </div> */}

            {/* <div className="flex gap-3 text-center p-6 md:p-6 relative">
              <div className="relative">
                <TspGauge />
              </div>
            </div>

            <div className="w-full relative md:flex md:flex-row md:justify-end md:gap-4 mt-0 md:mt-32">
              <TrendChart />
              <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-5 p-4 md:p-0">
                <TotalTransactions />
                <MaxTps />
              </div>
            </div>

            <div className="text-white text-center text-4xl md:text-6xl font-roobert-medium mt-10">
              Will it break? Can you break it?
            </div>

            <div className="w-full p-4 flex justify-center relative flex-col items-center ">
              <div className="p-4 rounded-2xl bg-neutral-900 w-full md:max-w-[80%]">
                <SpamSection />
              </div>
            </div> */}

            <div className="w-full p-4 flex justify-center relative flex-col md:flex-row md:max-w-[80%] gap-6">
              <div className="p-4 rounded-2xl w-full md:max-w-[40%]">
                <Top10 />
              </div>
              <div className="p-4 rounded-2xl w-full md:max-w-[60%]">
                <DailyActivity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
