import { ReactNode } from 'react';

export const SpammerCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full p-1 mt-10 flex justify-center">
      <ol className="flex flex-col max-w-4xl w-full">{children}</ol>
    </div>
  );
};
