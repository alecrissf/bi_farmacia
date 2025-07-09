import { COLORS } from '@/utils/colors';
import { CircularChart } from '../CircularChart';

export interface VendasPorMarketingChartProps {
  isFullscreen: boolean;
}

export function VendasPorMarketingChart({
  isFullscreen,
}: VendasPorMarketingChartProps) {
  const data = [
    { name: 'Referência', value: 400, fill: COLORS[0] },
    { name: 'Genérico', value: 300, fill: COLORS[1] },
    { name: 'Similar', value: 100, fill: COLORS[2] },
  ];

  return (
    <CircularChart data={data} className={isFullscreen ? 'text-4xl' : ''} />
  );
}
