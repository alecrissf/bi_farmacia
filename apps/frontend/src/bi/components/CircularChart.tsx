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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
          innerRadius="65%"
          outerRadius="80%"
          paddingAngle={2}
          nameKey="name"
          dataKey="value"
          stroke=""
          label
          // label={renderLabel}
          legendType="circle"
          isAnimationActive={false}
        >
          <Legend verticalAlign="middle" layout="vertical" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

const RADIAN = Math.PI / 180;

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  payload,
}: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 2.1;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      // fill={COLORS[(index ?? 0) % COLORS.length]}
      fill={payload.fill}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {name} - {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};
