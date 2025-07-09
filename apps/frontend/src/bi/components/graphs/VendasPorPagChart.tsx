import { COLORS } from '@/utils/colors';
import { CircularChart } from '../CircularChart';

export interface VendasPorPagChartProps {
  isFullscreen: boolean;
}

export function VendasPorPagChart({ isFullscreen }: VendasPorPagChartProps) {
  const data = [
    { name: 'Pix', value: 400, fill: COLORS[0] },
    { name: 'Dinheiro', value: 300, fill: COLORS[1] },
    { name: 'Cartão de Crédito', value: 100, fill: COLORS[2] },
    { name: 'Cartão de Débito', value: 150, fill: COLORS[3] },
  ];

  return (
    <CircularChart data={data} className={isFullscreen ? 'text-4xl' : ''} />
  );
}
