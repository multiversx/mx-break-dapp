import { ReactNode } from 'react';

export const Stat = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="w-full flex flex-col items-start justify-center max-w-sm p-6 bg-white border-2 border-neutral-800 rounded-lg shadow dark:bg-black">
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <div className="flex sm:flex-col">{children}</div>
    </div>
  );
};
