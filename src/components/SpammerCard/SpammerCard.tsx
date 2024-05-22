import { ReactNode } from 'react';

export const SpammerCard = ({ children }: { children: ReactNode }) => {
  return <ol className="flex flex-col w-full">{children}</ol>;
};
