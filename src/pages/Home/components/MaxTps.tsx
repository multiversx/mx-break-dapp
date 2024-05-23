import { Stat } from 'components/Stat/Stat';
import { useEffect, useRef } from 'react';
import { useGetMaxTps } from 'hooks/useGetMaxTps';
import { AnimateNumber } from 'components/AnimateNumber/AnimateNumber';

export const MaxTps = () => {
  const mountedRef = useRef(false);
  const { maxTps, pending, error } = useGetMaxTps();

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  if (error) {
    return (
      <Stat title="Max TPS Achieved">
        <div className="text-neutral-300">-</div>
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
      <div className="text-red-500">
        <a
          href="https://explorer.voyager1.dev/blocks/14e21102b8636d4003c0a4f434ba35d7a4863246f77f8a0ec12f6414c0d276e8"
          target="_blank"
        >
          <AnimateNumber amount={Math.round(maxTps)} />
        </a>
      </div>
    </Stat>
  );
};
