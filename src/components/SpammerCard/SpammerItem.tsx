import { ReactNode } from 'react';

export const SpammerItem = ({
  children,
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col gap-4 justify-between sm:flex-row">
        <div className="flex flex-col">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
