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
    <div className="p-4">
      <div className="flex flex-col gap-4 justify-between sm:flex-row">
        <div className="flex flex-col gap-4">
          <h5 className="text-2xl font-roobert-medium tracking-tight text-neutral-200">{title}</h5>
          <p className="font-normal text-neutral-500">{subtitle}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
