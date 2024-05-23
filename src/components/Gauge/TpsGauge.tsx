import React from 'react';
import { useGauge } from 'use-gauge';
import { motion, MotionConfig } from 'framer-motion';
import { getIsMobileDeviceScreen } from '../../helpers/getIsMobileDevideScreen';
import { TspOnMobileView } from './components/TspOnMobileView';
import { TspOnDesktopView } from './components/TspOnDesktopView';
import { GAUGE_MAX_VALUE, useGaugeData } from './hooks/useGaugeData';

const START_ANGLE = 70;
const END_ANGLE = 290;

interface SpeedProps {
  value: number;
  guardedValue: number;
  maxValueAchieved?: number;
  guardedMaxValueAchieved?: number;
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

function Gauge(props: SpeedProps) {
  const { value, guardedValue, maxValueAchieved = 0, guardedMaxValueAchieved = 0 } = props;
  const isMobileDevice = getIsMobileDeviceScreen();

  // Compute the angle using linear interpolation within the range
  const calcAngle = (val: number) => {
    // Compute the proportion of the value within the range
    const proportion = val / GAUGE_MAX_VALUE;

    // Compute the corresponding angle within the angle range
    const angle = START_ANGLE + proportion * (END_ANGLE - START_ANGLE);

    return Math.round(angle);
  };

  const gauge = useGauge({
    domain: [0, 60_000],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 19,
    diameter: 400,
  });

  const gaugeMaxTps = useGauge({
    domain: [0, 60_000],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 1,
    diameter: 390,
  });
  const gaugeMaxTpsTickProps = gaugeMaxTps.getTickProps({
    angle: calcAngle(guardedMaxValueAchieved),
    length: 50,
  });

  const needle = gauge.getNeedleProps({
    value: guardedValue,
    baseRadius: 8,
    tipRadius: 2,
    offset: -15,
  });

  return (
    <div className="relative z-10">
      <svg className="w-full overflow-visible p-6 top-0 left-0" {...gauge.getSVGProps()}>
        <defs>{arcGradient(guardedValue)}</defs>

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

          {/*<path*/}
          {/*  {...gauge.getArcProps({*/}
          {/*    offset: 20,*/}
          {/*    startAngle: -START_ANGLE + 4,*/}
          {/*    endAngle: -END_ANGLE - 60,*/}
          {/*  })}*/}
          {/*  fill="none"*/}
          {/*  className="stroke-blue-400"*/}
          {/*  strokeLinecap="round"*/}
          {/*  strokeWidth={1}*/}
          {/*/>*/}

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
                    length: showText ? 14 : 8,
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
        <g id="ticks">
          <line
            className={'stroke-red-700'}
            strokeWidth={2}
            height={10}
            {...gaugeMaxTpsTickProps}
          />
          {!isMobileDevice && (
            <a
              href="https://explorer.voyager1.dev/blocks/14e21102b8636d4003c0a4f434ba35d7a4863246f77f8a0ec12f6414c0d276e8"
              target="_blank"
            >
              <text
                className="fill-red-400 font-medium"
                {...gauge.getLabelProps({
                  angle: calcAngle(guardedMaxValueAchieved),
                  offset: -100,
                })}
              >
                {`${Math.round(maxValueAchieved).toLocaleString()} MAX TPS`}{' '}
              </text>
            </a>
          )}
        </g>
        <g id="needle">
          <motion.line
            className="stroke-neutral-200"
            strokeLinecap="round"
            strokeWidth={4}
            animate={{
              x1: needle.base.cx,
              x2: needle.tip.cx,
              y1: needle.base.cy,
              y2: needle.tip.cy,
            }}
          />

          {/*<motion.circle*/}
          {/*  className="fill-gray-400 opacity-25"*/}
          {/*  animate={{*/}
          {/*    cx: needle.base.cx,*/}
          {/*    cy: needle.base.cy,*/}
          {/*  }}*/}
          {/*  r={20}*/}
          {/*/>*/}

          <motion.circle
            className="fill-gray-200"
            animate={{
              cx: needle.base.cx,
              cy: needle.base.cy,
            }}
            r={6}
          />
        </g>
      </svg>
      {isMobileDevice ? (
        <TspOnMobileView value={value} maxValueAchieved={maxValueAchieved} />
      ) : (
        <TspOnDesktopView value={value} />
      )}
    </div>
  );
}

export function TspGauge() {
  const { tps, guardedTpsValue, maxTps, guardedMaxTps } = useGaugeData();
  const maxValueAchieved = Math.round(maxTps);
  // const tps = 30000;
  // const maxValueAchieved = 1800;
  return (
    <MotionConfig transition={{ type: 'tween', ease: 'linear' }}>
      <Gauge
        value={tps}
        guardedValue={guardedTpsValue}
        maxValueAchieved={maxValueAchieved}
        guardedMaxValueAchieved={guardedMaxTps}
      />
    </MotionConfig>
  );
}
