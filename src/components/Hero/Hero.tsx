import { ReactNode } from 'react';

export const Hero = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex items-center justify-center h-screen mb-12">
      <div className="relative flex w-full flex-col items-center md:mt-36 mt-[75rem] bg-contain">
        <div className="md:3/4 lg:2/4 z-[1] mx-auto flex w-full flex-col items-center gap-10 md:gap-16 md:mb-14 mt-10 md:mt-36">
          {children}
        </div>
      </div>
      <video autoPlay loop muted className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
        <source src="https://cdn.multiversx.com/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
