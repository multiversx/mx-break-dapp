import { ReactNode } from 'react';

export const Hero = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full mb-12">
      <div className="relative flex w-full flex-col items-center overflow-hidden">
        <div className="z-[1] mx-auto flex w-full flex-col items-center gap-10 md:gap-16">
          {children}
        </div>

        <video
          autoPlay
          loop
          muted
          className="absolute z-0 top-[-10rem] w-auto min-w-full min-h-full max-w-none"
        >
          <source src="https://cdn.multiversx.com/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
