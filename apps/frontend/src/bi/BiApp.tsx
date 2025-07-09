import { ReactNode, useEffect, useState } from 'react';
import { Card } from './components/Card';
import {
  ChartData,
  CircularChart,
  CircularChartProps,
} from './components/CircularChart';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import {
  Bar,
  BarChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const vendasPorCat = [
  { name: 'Referência', value: 400, fill: '#0088FE' },
  { name: 'Genérico', value: 300, fill: '#00C49F' },
  { name: 'Similar', value: 100, fill: '#FFBB28' },
];

const graphs: GraphCardData[] = [
  {
    title: 'Top 5 Produtos Mais Vendidos',
    render: ({ isFullscreen }) => (
      <ResponsiveContainer className={isFullscreen ? 'text-4xl' : ''}>
        <BarChart data={vendasPorCat} margin={{ top: 60 }}>
          <Bar dataKey="value" isAnimationActive={false}>
            <LabelList dataKey="name" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: 'Total de Vendas por Categoria',
    render: ({ isFullscreen }) => (
      <CircularChart
        data={vendasPorCat}
        className={isFullscreen ? 'text-4xl' : ''}
      />
    ),
  },
  {
    title: 'Total de Vendas por Forma de Pagamento',
    render: ({ isFullscreen }) => (
      <CircularChart
        data={vendasPorCat}
        className={isFullscreen ? 'text-4xl' : ''}
      />
    ),
  },
  {
    title: 'Total de Vendas por Tipo de Promoção',
    render: ({ isFullscreen }) => (
      <CircularChart
        data={vendasPorCat}
        className={isFullscreen ? 'text-4xl' : ''}
      />
    ),
  },
  {
    title: 'Total de Vendas por Campanha de Marketing',
    render: ({ isFullscreen }) => (
      <CircularChart
        data={vendasPorCat}
        className={isFullscreen ? 'text-4xl' : ''}
      />
    ),
  },
];

export function BiApp() {
  const [isSlide, setIsSlide] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSlide) {
        setSlideIndex(old => (old + 1) % graphs.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isSlide]);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-start gap-4 px-10 py-5 text-white">
      <div className="flex w-full flex-row items-center gap-3 rounded-2xl bg-zinc-800 p-5">
        <h4>Slide:</h4>
        <button
          className="flex cursor-pointer items-center justify-center"
          onClick={() => {
            setIsSlide(old => !old);
            setSlideIndex(0);
          }}
        >
          {isSlide ? (
            <FiToggleRight
              size={30}
              className="stroke-sky-600 hover:stroke-sky-500"
            />
          ) : (
            <FiToggleLeft size={30} className="hover:stroke-sky-500" />
          )}
        </button>
      </div>

      {isSlide ? (
        <div className="flex-colitems-center flex h-[80vh] w-full flex-col justify-center gap-3 rounded-2xl bg-zinc-800 p-10">
          <h3 className="text-center text-4xl">{graphs[slideIndex].title}</h3>
          <div className="h-full w-11/12">
            {graphs[slideIndex].render({ isFullscreen: true })}
          </div>
        </div>
      ) : (
        <GraphGrid graphs={graphs} />
      )}
    </div>
  );
}

interface GraphCardData {
  title: string;
  render: (props: { isFullscreen: boolean }) => ReactNode;
}

interface GraphGridProps {
  graphs: GraphCardData[];
}

function GraphGrid({ graphs }: GraphGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <div className="grid grid-rows-2 gap-3">
        <div className="flex flex-col justify-center gap-4 rounded-2xl bg-zinc-800 p-5">
          <h3 className="text-lg">Total de Vendas</h3>
          <b className="text-3xl">R$ 100 K</b>
        </div>
        <div className="flex flex-col justify-center gap-4 rounded-2xl bg-zinc-800 p-5">
          <h3 className="text-lg">Quantidade de Vendas</h3>
          <b className="text-3xl">10 K</b>
        </div>
      </div>

      {/* <div className="col-span-1 lg:col-span-2"></div> */}

      {graphs.map((graph, index) => (
        <Card title={graph.title} key={graph.title}>
          {graph.render({ isFullscreen: false })}
        </Card>
      ))}

      {/* <Card title="Total de Vendas por Categoria">
        <CircularChart data={vendasPorCat} cx="45%" />
      </Card> */}

      {/* <Card title="Total de Vendas por Marca">
        <CircularChart data={vendasPorCat} />
      </Card> */}

      {/* <Card title="Total de Vendas por Forma de Pagamento">
        <CircularChart data={vendasPorCat} />
      </Card> */}

      {/* <Card title="Total de Vendas por Bairro">
        <CircularChart data={vendasPorCat} />
      </Card> */}

      {/* <Card title="Total de Vendas por Tipo de Promoção">
        <CircularChart data={vendasPorCat} />
      </Card> */}

      {/* <Card title="Total de Vendas por Campanha de Marketing">
        <CircularChart data={vendasPorCat} />
      </Card> */}
    </div>
  );
}
