import { ReactNode } from 'react';

export const Hero = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex w-full flex-col items-center bg-[url('/src/assets/hero.png')] md:-mt-36 bg-contain md:bg-cover bg-top bg-no-repeat md:bg-[url('/src/assets/hero.png')]">
      <div className="md:3/4 lg:2/4 z-[1] mx-auto flex w-full flex-col items-center gap-10 md:gap-16 md:mb-14 mt-10 md:mt-36">
        {children}
      </div>
    </div>
  );
};
