import { Stat } from '../../../components/Stat/Stat';
import { useEffect, useRef } from 'react';
import { useGetMaxTps } from '../../../hooks/useGetMaxTps';

export const MaxTps = () => {
  const mountedRef = useRef(false);
  const { maxTps, pending, error } = useGetMaxTps();

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  if (error) {
    return (
      <Stat title="Max TPS Achieved">
        <div className="text-neutral-300">Error</div>
      </Stat>
    );
  }

  if (pending && !mountedRef.current) {
    return (
      <Stat title="Max TPS Achieved">
        <div className="text-neutral-300">Loading...</div>
      </Stat>
    );
  }

  return (
    <Stat title="Max TPS Achieved">
      <div className="text-red-500">{maxTps.toLocaleString()}</div>
    </Stat>
  );
};
