import { COLORS } from '@/utils/colors';
import { ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';

export interface TopProductsChartProps {
  isFullscreen: boolean;
}

export function TopProductsChart({ isFullscreen }: TopProductsChartProps) {
  const data = [
    { name: 'Referência', value: 400, fill: COLORS[0] },
    { name: 'Genérico', value: 300, fill: COLORS[1] },
    { name: 'Similar', value: 100, fill: COLORS[2] },
  ];

  return (
    <ResponsiveContainer className={isFullscreen ? 'text-4xl' : ''}>
      <BarChart data={data} margin={{ top: 60 }}>
        <Bar dataKey="value" isAnimationActive={false}>
          <LabelList dataKey="name" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
