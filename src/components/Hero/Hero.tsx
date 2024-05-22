import { ReactNode } from 'react';

export const Hero = ({ children }: { children: ReactNode }) => {
  return (
    /*<div className="relative flex w-full flex-col items-center bg-[url('/src/assets/hero.png')] bg-top bg-no-repeat md:bg-[url('/src/assets/hero.png')] bg-cover">*/
    <div className="relative flex w-full flex-col items-center">
      <div className="md:3/4 lg:2/4 z-[1] mx-auto flex w-full flex-col items-center gap-16 md:mb-14">
        {children}
      </div>
    </div>
  );
};
