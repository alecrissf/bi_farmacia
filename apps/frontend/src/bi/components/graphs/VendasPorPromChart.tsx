import { COLORS } from '@/utils/colors';
import { CircularChart } from '../CircularChart';

export interface VendasPorPromChartProps {
  isFullscreen: boolean;
}

export function VendasPorPromChart({ isFullscreen }: VendasPorPromChartProps) {
  const data = [
    { name: 'Percentual', value: 400, fill: COLORS[0] },
    { name: 'Fixo', value: 300, fill: COLORS[1] },
  ];

  return (
    <CircularChart data={data} className={isFullscreen ? 'text-4xl' : ''} />
  );
}
