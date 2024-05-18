import { useEffect, useRef, Fragment } from 'react';
import {
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  Area,
} from 'recharts';
import { useGetHistoricalTps } from 'pages/Home/hooks/useGetHistoricalTps.ts';
import moment from 'moment';

// const ENDPOINT = "http://127.0.0.1:4001";

export function TrendChart() {
  // const timeoutRef = useRef<NodeJS.Timeout>();
  const { tps: chartData, getHistoricalTps } = useGetHistoricalTps();

  // useEffect(() => {
  //   if (timeoutRef.current !== null) {
  //     clearTimeout(timeoutRef.current);
  //   }
  //   const interval = 6000;
  //   const speed = 1000;
  //   for (let i = 0; i < interval; i++) {
  //     timeoutRef.current = setTimeout(() => {
  //       clearTimeout(timeoutRef.current);
  //       getHistoricalTps();
  //     }, i * speed);
  //   }
  // }, [getHistoricalTps]);

  return (
    <div className="w-full flex flex-col">
      <button onClick={getHistoricalTps}>Get new historical data</button>
      <div className="w-full h-80 p-10 mt-10 flex justify-center items-center my-auto flex-col gap-64">
        <ResponsiveContainer>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="tps-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.15} />
                <stop offset="95%" stopColor="red" stopOpacity={0} />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="transparent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="100%" stopColor="transparent" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={'gray'} opacity={0.8} strokeDasharray="5 5" />
            <XAxis
              minTickGap={40}
              tickCount={10}
              dataKey="timestamp"
              tickLine={false}
              domain={chartData.map((x) => x.timestamp)}
              tickFormatter={(tick) => moment.unix(tick).utc().format('hh:mm:ss')}
              strokeWidth={0.3}
              tickMargin={15}
            />

            <Fragment key={`y-axis-chart-tps`}>
              <YAxis
                orientation={'left'}
                tickFormatter={(tick) => (Math.round(tick * 100) / 100).toString()}
                axisLine={false}
                tickLine={false}
                stroke={'red'}
                dy={2}
                domain={[0, 'dataMax']}
                tickCount={10}
              />
              <Area
                type="monotone"
                dataKey={'tps'}
                stroke={'green'}
                {...{ fill: `url(#tps-gradient)` }}
                strokeWidth={1.5}
                activeDot={{
                  stroke: 'red',
                  fill: 'red',
                }}
                visibility="visible"
                isAnimationActive={false}
                // animationEasing={'linear'}
                // animationDuration={1000}
              />
            </Fragment>
            <Tooltip
              content={(props) => {
                return (
                  <div className="recharts-tooltip-label text-neutral-800">
                    <span>
                      {props.payload?.[0]?.payload?.timestamp
                        ? moment
                            .unix(props.payload[0].payload.timestamp)
                            .utc()
                            .format('D MMM YYYY hh:mm:ss')
                        : 'label'}
                    </span>
                    <div>
                      <ul className="recharts-tooltip-item-list list-unstyled">
                        {props.payload?.map((entry) => {
                          const displayValue = entry.value;
                          return (
                            <li
                              key={entry.name}
                              style={{ textAlign: 'start' }}
                              className="d-flex flex-column"
                            >
                              <span className="item-label">{`${entry.name}`}</span>
                              <span className="item-value">{displayValue}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
