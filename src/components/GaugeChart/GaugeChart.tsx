import { Sector, Cell, PieChart, Pie } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { useGetLatestTps } from '../../pages/Home/hooks/useGetLatestTps.ts';

export const GaugeChart = () => {
  const { tps } = useGetLatestTps();
  console.log('tps', tps);

  const width = 500;
  const chartValue = tps * 100;
  const colorData = [
    {
      value: 25, // Meaning span is 0 to 40
      color: '#663399',
    },
    {
      value: 50, // span 40 to 140
      color: '#e91e63',
    },
    {
      value: 25,
      color: '#4caf50',
    },
  ];

  const activeSectorIndex = colorData
    .map((cur, index, arr) => {
      const curMax = [...arr].splice(0, index + 1).reduce((a, b) => ({
        value: a.value + b.value,
        color: colorData.find((x) => x.value <= a.value + b.value)?.color ?? '',
      })).value;
      return chartValue > curMax - cur.value && chartValue <= curMax;
    })
    .findIndex((cur) => cur);

  const sumValues = colorData.map((cur) => cur.value).reduce((a, b) => a + b);

  const arrowData = [{ value: chartValue }, { value: 0 }, { value: sumValues - chartValue }];

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

  const Arrow = ({ cx, cy, midAngle, outerRadius }: PieSectorDataItem) => {
    midAngle = midAngle ?? 1;
    cx = cx ?? 0;
    cy = cy ?? 0;
    outerRadius = outerRadius ?? 0;

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + width * 0.03) * cos;
    const my = cy + (outerRadius + width * 0.03) * sin;
    return (
      <g>
        <circle cx={cx} cy={cy} r={width * 0.05} fill="#666" stroke="none" />
        <path
          d={`M${cx},${cy}L${mx},${my}`}
          strokeWidth="6"
          stroke="#666"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
  };

  const ActiveSectorMark = ({
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  }: PieSectorDataItem) => {
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={(outerRadius ?? 1) * 1.2}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <PieChart width={width} height={width / 2 + 30}>
      {/*<text x={345} y={265} textAnchor="middle" dominantBaseline="middle">*/}
      {/*  30*/}
      {/*</text>*/}
      <text fontSize={11} x={255} y={200} textAnchor="middle" dominantBaseline="middle">
        TPS {tps.toFixed(2)}
      </text>
      <Pie
        dataKey={'value'}
        activeIndex={activeSectorIndex}
        activeShape={ActiveSectorMark}
        data={colorData}
        fill="#8884d8"
        {...pieRadius}
        {...pieProps}
      >
        {colorData.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={colorData[index].color} />
        ))}
      </Pie>
      <Pie
        dataKey={'value'}
        stroke="none"
        activeIndex={1}
        activeShape={Arrow}
        data={arrowData}
        outerRadius={pieRadius.innerRadius}
        fill="none"
        {...pieProps}
      />
    </PieChart>
  );
};
