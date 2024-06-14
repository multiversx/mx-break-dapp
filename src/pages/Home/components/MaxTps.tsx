import { Stat } from 'components/Stat/Stat';
import { useEffect, useRef } from 'react';
import { useGetMaxTps } from 'hooks/useGetMaxTps';
import { AnimateNumber } from 'components/AnimateNumber/AnimateNumber';
import { REFERENCE_MAX_TPS } from 'config';

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
        {maxTps === REFERENCE_MAX_TPS ? (
          <a
            href="https://explorer.voyager1.dev/blocks/be8f9f99701d169eb3723e1a4975d54cc29b1efef58e676c90644db563238ddd"
            target="_blank"
          >
            <AnimateNumber
              amount={Math.round(maxTps)}
              className="hover:underline hover:text-red-500"
            />
          </a>
        ) : (
          <AnimateNumber amount={Math.round(maxTps)} />
        )}
      </div>
    </Stat>
  );
};
