import { TspGauge } from '../Gauge/TpsGauge.tsx';

export const Hero = () => {
  return (
    <div className="relative flex w-full flex-col -mt-16 min-h-[calc(100vh-120px)] xl:min-h-[calc(90vh-120px)] items-center pt-10 sm:pt-20 md:pt-20 xl:pt-40 bg-[url('/src/assets/hero.png')] bg-top bg-no-repeat md:bg-[url('/src/assets/hero.png')] bg-contain">
      {/*<div className="absolute -top-32 z-0 h-5/6 w-full origin-top bg-blue-900 bg-opacity-80 opacity-20 blur-[100px]" />*/}
      <div className="md:3/4 lg:2/4 z-[1] mx-auto flex w-full flex-col items-center gap-10 md:mb-14">
        <div className="container-page gap-3 text-center">
          <TspGauge />
        </div>
      </div>
    </div>
  );
};
