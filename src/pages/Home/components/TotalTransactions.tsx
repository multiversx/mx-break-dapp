import { Stat } from '../../../components/Stat/Stat.tsx';
import { useGetTotalTransactions } from '../../../hooks/useGetTotalTransactions.ts';
import { useEffect, useRef } from 'react';

export const TotalTransactions = () => {
  const mountedRef = useRef(false);
  const { totalTransactions, pending, error } = useGetTotalTransactions();

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  if (error) {
    return (
      <Stat title="Total Transactions">
        <div className="text-neutral-500 text-3xl">Error</div>
      </Stat>
    );
  }

  if (pending && !mountedRef.current) {
    return (
      <Stat title="Total Transactions">
        <div className="text-neutral-500 text-3xl">Loading...</div>
      </Stat>
    );
  }

  return (
    <Stat title="Total Transactions">
      <div className="text-neutral-500 text-3xl">{totalTransactions.toLocaleString()}</div>
    </Stat>
  );
};
