import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';
import { PieLabelProps } from 'recharts/types/polar/Pie';

export interface ChartData {
  name: string;
  value: number;
}

export interface CircularChartProps {
  data: ChartData[];
  cx?: number | string;
  cy?: number | string;
  className?: string;
}

export function CircularChart({
  data,
  className,
  cx = '50%',
  cy = '50%',
}: CircularChartProps) {
  return (
    <ResponsiveContainer className={className}>
      <PieChart margin={{ top: 20, bottom: 20 }}>
        <Pie
          data={data}
          cx={cx}
          cy={cy}
          innerRadius="0%"
          outerRadius="80%"
          paddingAngle={0}
          nameKey="name"
          dataKey="value"
          stroke=""
          label
          legendType="circle"
          animationDuration={600}
          // isAnimationActive={false}
        >
          <Legend verticalAlign="bottom" layout="vertical" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
