import { server } from '@/lib/server';
import { COLORS, COLORS_2 } from './colors';

export interface ChartDataType {
  name: string;
  value: number;
  fill: string;
}

export const dataListPlaceholder: ChartDataType[] = [
  { name: 'Referência', value: 400, fill: COLORS[0] },
  { name: 'Genérico', value: 300, fill: COLORS[1] },
  { name: 'Similar', value: 100, fill: COLORS[2] },
] as const;

export interface ChartServerData {
  totalVendas: number;
  qtdVendas: number;
  topProducts: ChartDataType[];
  vendasPorCat: ChartDataType[];
  vendasPorMarketing: ChartDataType[];
  vendasPorPag: ChartDataType[];
  vendasPorProm: ChartDataType[];
}

export const defaultChartServerData: ChartServerData = {
  totalVendas: 0,
  qtdVendas: 0,
  topProducts: [],
  vendasPorCat: [],
  vendasPorMarketing: [],
  vendasPorPag: [],
  vendasPorProm: [],
} as const;

export async function getChartServerData() {
  const chartData: ChartServerData = defaultChartServerData;

  const toChartData = (data: Record<string, number>) =>
    Object.entries(data).map(([k, v], index) => ({
      name: k,
      value: v,
      fill:
        data.length > COLORS.length
          ? COLORS_2[index % COLORS_2.length]
          : COLORS[index % COLORS.length],
    }));

  const { data: vendas } = await server.vendas.get();
  if (vendas) {
    const vendasPorCatData: Record<string, number> = {};
    const vendasPorMarketingData: Record<string, number> = {};
    const vendasPorPagData: Record<string, number> = {};
    const vendasPorPromData: Record<string, number> = {};

    for (const dt of vendas) {
      if (dt.tipoPagamento.descricao in vendasPorPagData) {
        vendasPorPagData[dt.tipoPagamento.descricao]++;
      } else {
        vendasPorPagData[dt.tipoPagamento.descricao] = 0;
      }

      if (dt.campanhaMarketing) {
        if (dt.campanhaMarketing.nome in vendasPorMarketingData) {
          vendasPorMarketingData[dt.campanhaMarketing.nome]++;
        } else {
          vendasPorMarketingData[dt.campanhaMarketing.nome] = 0;
        }
      }

      for (const pd of dt.pedidos) {
        chartData.totalVendas += Number(pd.produto.preco);

        if (pd.produto.categoria.nome in vendasPorCatData) {
          vendasPorCatData[pd.produto.categoria.nome]++;
        } else {
          vendasPorCatData[pd.produto.categoria.nome] = 0;
        }

        if (pd.promocao) {
          if (pd.promocao.nome in vendasPorPromData) {
            vendasPorPromData[pd.promocao.nome]++;
          } else {
            vendasPorPromData[pd.promocao.nome] = 0;
          }
        }
      }
    }
    chartData.qtdVendas = vendas.length;

    chartData.vendasPorCat = toChartData(vendasPorCatData);
    chartData.vendasPorMarketing = toChartData(vendasPorMarketingData);
    chartData.vendasPorPag = toChartData(vendasPorPagData);
    chartData.vendasPorProm = toChartData(vendasPorPromData);
  }

  const { data: produtos } = await server.produto.top({ n: 5 }).get();
  if (produtos) {
    chartData.topProducts = produtos.map((dt, index) => ({
      name: dt.nome,
      value: dt._count.pedidos,
      fill: COLORS_2[index % COLORS_2.length],
    }));
  }

  return chartData;
}
