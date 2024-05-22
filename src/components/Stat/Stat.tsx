import { ReactNode } from 'react';

export const Stat = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="w-full md:max-w-xs flex flex-col items-start justify-center p-6 border border-neutral-800 rounded-2xl gap-4">
      <h5 className="font-semibold tracking-tight text-neutral-400">{title}</h5>
      <div className="text-2xl">{children}</div>
    </div>
  );
};
