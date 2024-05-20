import { Fragment } from 'react';
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

export function TrendChart() {
  const { tps: chartData, getHistoricalTps } = useGetHistoricalTps();

  return (
    <div className="w-full flex flex-col bg-neutral-950">
      {import.meta.env.DEV && <button onClick={getHistoricalTps}>Get new historical data</button>}
      <div className="w-full h-96 sm:h-80 sm:gap-32 sm:p-1 sm:mt-1 flex justify-center items-center my-auto flex-col gap-64">
        <ResponsiveContainer>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="tps-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ac2ae" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0ac2ae" stopOpacity={0} />
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
              stroke={'#ffffff'}
            />

            <Fragment key={`y-axis-chart-tps`}>
              <YAxis
                orientation={'left'}
                tickFormatter={(tick) => (Math.round(tick * 100) / 100).toString()}
                axisLine={false}
                tickLine={false}
                stroke={'#0ac2ae'}
                dy={2}
                domain={[0, 'dataMax']}
                tickCount={10}
              />
              <Area
                type="monotone"
                dataKey={'tps'}
                stroke={'#0ac2ae'}
                {...{ fill: `url(#tps-gradient)` }}
                strokeWidth={1.5}
                activeDot={{
                  stroke: '#0ac2ae',
                  fill: '#0ac2ae',
                }}
                visibility="visible"
                isAnimationActive={false}
              />
            </Fragment>
            <Tooltip
              content={(props) => {
                return (
                  <div className="rounded-lg bg-black py-3 px-6 text-left align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-neutral-200">
                    <span className="text-gray-400">
                      {props.payload?.[0]?.payload?.timestamp
                        ? moment
                            .unix(props.payload[0].payload.timestamp)
                            .utc()
                            .format('D MMM YYYY hh:mm:ss')
                        : 'label'}
                    </span>
                    <div>
                      <ul className="recharts-tooltip-item-list list-unstyled font-mono">
                        {props.payload?.map((entry) => {
                          const displayValue = Math.round(Number(entry.value) * 100) / 100;
                          return (
                            <li
                              key={entry.name}
                              style={{ textAlign: 'start' }}
                              className="d-flex flex-column mt-1"
                            >
                              <span className="">{`${entry.name}`}:</span>
                              <span className="ml-2">{displayValue}</span>
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
