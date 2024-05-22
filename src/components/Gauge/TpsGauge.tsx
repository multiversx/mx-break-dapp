import React, { useMemo } from 'react';
import { useGauge } from 'use-gauge';
import { motion, MotionConfig } from 'framer-motion';
import { useGetLatestTps } from '../../hooks/useGetLatestTps.ts';
// import CenterIcon from '../../assets/06.svg?react';

const START_ANGLE = 70;
const END_ANGLE = 290;
const MAX_SPEED = 60_000;

// Remove the normalization factor to get the actual TPS
const NORMALIZATION_FACTOR_TO_BE_REMOVED = 1; // 10_000;

const useSpeedTest = () => {
  const { tps } = useGetLatestTps();

  if (tps <= 0) {
    return 0;
  }

  if (tps >= MAX_SPEED) {
    return MAX_SPEED;
  }

  return tps * NORMALIZATION_FACTOR_TO_BE_REMOVED;
};

interface SpeedProps {
  value: number;
}

const arcGradient = (value: number) => {
  if (value <= 1_000) {
    return (
      <linearGradient id="arc-value-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="100%" stopColor="#00a9fe" />
      </linearGradient>
    );
  }
  if (value > 1_000 && value <= 10_000) {
    return (
      <linearGradient id="arc-value-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00a9fe" />
      </linearGradient>
    );
  }
  if (value > 10_000 && value <= 15_000) {
    return (
      <linearGradient id="arc-value-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00a9fe" />
        <stop offset="100%" stopColor="#2276a0" />
      </linearGradient>
    );
  }
  if (value > 10_000 && value <= 25_000) {
    return (
      <linearGradient id="arc-value-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8ae4ad" />
      </linearGradient>
    );
  }
  if (value > 25_000 && value <= 49_000) {
    return (
      <linearGradient id="arc-value-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00a9fe" />
        <stop offset="25%" stopColor="#4fcf90" />
        <stop offset="50%" stopColor="#4fcf90" />
        <stop offset="70%" stopColor="#4fcf90" />
        <stop offset="100%" stopColor="#2cce7e" />
      </linearGradient>
    );
  }
  if (value > 49_000) {
    return (
      <linearGradient id="arc-value-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#dc4265" />
        <stop offset="25%" stopColor="#9b0527" />
        <stop offset="50%" stopColor="#9b0527" />
        <stop offset="75%" stopColor="#fa0303" />
        <stop offset="100%" stopColor="#fa0303" />
      </linearGradient>
    );
  }
};

function Speed(props: SpeedProps) {
  const { value } = props;

  const guardedValue = useMemo(() => {
    if (value < 0) {
      return 0;
    }

    if (value > MAX_SPEED) {
      return MAX_SPEED;
    }

    return value;
  }, [value]);

  const gauge = useGauge({
    domain: [0, 60_000],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 19,
    diameter: 400,
  });

  const needle = gauge.getNeedleProps({
    value: guardedValue,
    baseRadius: 8,
    tipRadius: 2,
  });

  return (
    <div className="relative">
      <svg className="w-full overflow-visible p-4 top-0 left-0" {...gauge.getSVGProps()}>
        <defs>{arcGradient(value)}</defs>

        <g id="arcs">
          <path
            {...gauge.getArcProps({
              offset: 30,
              startAngle: START_ANGLE,
              endAngle: END_ANGLE,
            })}
            fill="none"
            className="stroke-neutral-800"
            strokeLinecap="round"
            strokeWidth={24}
          />

          <path
            {...gauge.getArcProps({
              offset: 20,
              startAngle: -START_ANGLE + 4,
              endAngle: -END_ANGLE - 60,
            })}
            fill="none"
            className="stroke-gauge-bottom-arc-right"
            strokeLinecap="square"
            strokeWidth={2}
          />

          <path
            {...gauge.getArcProps({
              offset: 30,
              startAngle: START_ANGLE,
              endAngle: gauge.valueToAngle(guardedValue),
            })}
            fill="none"
            stroke={`url(#arc-value-gradient)`}
            strokeLinecap="round"
            strokeWidth={24}
          />
        </g>

        <g id="ticks">
          {gauge.ticks.map((angle) => {
            const asValue = gauge.angleToValue(angle);
            const showText = [10_000, 20_000, 30_000, 40_000, 50_000, 60_000].includes(
              Math.round(asValue / 1000) * 1000
            );

            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  className={'stroke-gray-300'}
                  strokeWidth={2}
                  height={10}
                  {...gauge.getTickProps({
                    angle,
                    length: 8,
                  })}
                />
                {showText && (
                  <text
                    className="fill-gray-400 font-medium"
                    {...gauge.getLabelProps({ angle, offset: 20 })}
                  >
                    {Math.round(asValue / 1000)}K
                  </text>
                )}
              </React.Fragment>
            );
          })}
        </g>
        <g id="needle">
          <motion.line
            className="stroke-neutral-700"
            strokeLinecap="round"
            strokeWidth={4}
            animate={{
              x1: needle.base.cx,
              x2: needle.tip.cx,
              y1: needle.base.cy,
              y2: needle.tip.cy,
            }}
          />

          <motion.circle
            className="fill-gray-200"
            animate={{
              cx: needle.base.cx,
              cy: needle.base.cy,
            }}
            r={20}
          />
        </g>
      </svg>
      <div className="absolute" style={{ top: '80%', left: '38%' }}>
        {/*<CenterIcon />*/}
        <div className="flex justify-center flex-col mt-2">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 me-2 text-sm text-left font-semibold text-teal bg-teal rounded-full" />
            <span className="text-sm font-medium text-teal text-left">Live TPS</span>
          </div>
          <div className="flex justify-center items-center mt-2">
            <div className="text-3xl font-medium text-neutral-200">
              {value > 60_000
                ? `${Math.round(value / 1000).toLocaleString()}K`
                : Math.round(value).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TspGauge() {
  const value = useSpeedTest();
  // const value = 70_111;
  return (
    <MotionConfig transition={{ type: 'tween', ease: 'linear' }}>
      <Speed value={value} />
    </MotionConfig>
  );
}
