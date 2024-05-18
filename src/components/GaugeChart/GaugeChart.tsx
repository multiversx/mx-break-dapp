import { Sector, Cell, PieChart, Pie } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { useGetLatestTps } from '../../pages/Home/hooks/useGetLatestTps.ts';
import { GaugeArrowIndicator } from './GaugeArrowIndicator.tsx';
import { useMemo } from 'react';

function normalize(list: number[]) {
  const minMax = list.reduce(
    (acc, value) => {
      if (value < acc.min) {
        acc.min = value;
      }

      if (value > acc.max) {
        acc.max = value;
      }

      return acc;
    },
    { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }
  );

  return list.map((value) => {
    // Verify that you're not about to divide by zero
    if (minMax.max === minMax.min) {
      return 1 / list.length;
    }

    const diff = minMax.max - minMax.min;
    return (value - minMax.min) / diff;
  });
}

export const GaugeChart = () => {
  // const { tps } = useGetLatestTps();
  // console.log('tps', tps);

  const tps = 200;

  const width = 500;
  const chartValue = normalize([tps])[0];
  const slices = [
    {
      value: 0,
      color: '#663399',
    },
    {
      value: 1,
      color: '#e91e63',
    },
    {
      value: 1,
      color: '#daba57',
    },
    {
      value: 1,
      color: '#4caf50',
    },
  ];

  const total = useMemo(() => slices.map((cur) => cur.value).reduce((a, b) => a + b), []);

  const arrowData = [{ value: chartValue }, { value: 0 }, { value: total - chartValue - 1 }];

  const pieProps = {
    startAngle: 180,
    endAngle: 0,
    cx: width / 2,
    cy: width / 2,
  };

  const pieRadius = {
    innerRadius: (width / 2) * 0.35,
    outerRadius: (width / 2) * 0.4,
  };

  console.log(chartValue, total, tps);
  console.log(arrowData);

  return (
    <PieChart width={width} height={width / 2 + 30}>
      <text fontSize={11} x={255} y={200} textAnchor="middle" dominantBaseline="middle">
        TPS {tps.toFixed(2)}
      </text>
      <Pie dataKey={'value'} data={slices} fill="#8884d8" {...pieRadius} {...pieProps}>
        {slices.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={slices[index].color} />
        ))}
      </Pie>
      <Pie
        dataKey={'value'}
        stroke="none"
        activeIndex={1}
        activeShape={GaugeArrowIndicator}
        data={arrowData}
        outerRadius={pieRadius.innerRadius}
        fill="none"
        {...pieProps}
      />
    </PieChart>
  );
};
