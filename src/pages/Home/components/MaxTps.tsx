import { Stat } from '../../../components/Stat/Stat.tsx';
import { useEffect, useRef } from 'react';
import { useGetMaxTps } from '../../../hooks/useGetMaxTps.ts';

export const MaxTps = () => {
  const mountedRef = useRef(false);
  const { maxTps, pending, error } = useGetMaxTps();

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  if (error) {
    return (
      <Stat title="Max TPS">
        <div className="text-neutral-500 text-3xl">Error</div>
      </Stat>
    );
  }

  if (pending && !mountedRef.current) {
    return (
      <Stat title="Max TPS">
        <div className="text-neutral-500 text-3xl">Loading...</div>
      </Stat>
    );
  }

  return (
    <Stat title="Max TPS">
      <div className="text-red-500 text-3xl">{maxTps.toLocaleString()}</div>
    </Stat>
  );
};