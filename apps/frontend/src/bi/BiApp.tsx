import { ReactNode, useEffect, useState } from 'react';
import { Card } from './components/Card';
import {
  FiToggleLeft,
  FiToggleRight,
  FiPause,
  FiPlay,
  FiFastForward,
} from 'react-icons/fi';
import { defaultChartServerData, getChartServerData } from '@/utils/data';
import { ResponsiveContainer, BarChart, XAxis, Bar, LabelList } from 'recharts';
import { CircularChart } from './components/CircularChart';

export function BiApp() {
  const [weirdFix, setWeirdFix] = useState(true);

  const [isSlide, setIsSlide] = useState(false);
  const [slideState, setSlideState] = useState(SlideState.Normal);
  const [chartData, setChartData] = useState(defaultChartServerData);

  const {
    totalVendas,
    qtdVendas,
    topProducts,
    vendasPorCat,
    vendasPorMarketing,
    vendasPorPag,
    vendasPorProm,
  } = chartData;

  useEffect(() => {
    getChartServerData()
      .then(val => {
        setChartData(val);
        setWeirdFix(old => !old);
      })
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    setSlideState(SlideState.Normal);
  }, [isSlide]);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-start gap-4 px-10 py-5 text-white">
      <div className="flex w-full flex-row items-center gap-3 rounded-2xl bg-zinc-800 p-5">
        <h4>Slide:</h4>

        <button
          className="flex cursor-pointer items-center justify-center"
          onClick={() => setIsSlide(old => !old)}
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

        <h4>Controles do Slide:</h4>

        <button
          className="flex cursor-pointer items-center justify-center"
          onClick={() => setSlideState(SlideState.Paused)}
        >
          <FiPause
            size={20}
            className={
              'hover:stroke-sky-500' +
              (slideState == SlideState.Paused ? ' stroke-sky-600' : '')
            }
          />
        </button>

        <button
          className="flex cursor-pointer items-center justify-center"
          onClick={() => setSlideState(SlideState.Normal)}
        >
          <FiPlay
            size={20}
            className={
              'hover:stroke-sky-500' +
              (slideState == SlideState.Normal ? ' stroke-sky-600' : '')
            }
          />
        </button>

        <button
          className="flex cursor-pointer items-center justify-center"
          onClick={() => setSlideState(SlideState.Fast)}
        >
          <FiFastForward
            size={20}
            className={
              'hover:stroke-sky-500' +
              (slideState == SlideState.Fast ? ' stroke-sky-600' : '')
            }
          />
        </button>
      </div>

      <GraphGrid isSlide={isSlide} slideState={slideState}>
        <div className="grid grid-rows-2 gap-3">
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-zinc-800 p-5">
            <h3 className="text-lg">Total de Vendas</h3>
            <b className="text-3xl">R$ {totalVendas}</b>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-zinc-800 p-5">
            <h3 className="text-lg">Quantidade de Vendas</h3>
            <b className="text-3xl">{qtdVendas}</b>
          </div>
        </div>

        <Card
          title="Top 5 Produtos Mais Vendidos"
          isFullSize={isSlide}
          className="col-span-2"
        >
          <ResponsiveContainer className={isSlide ? 'text-2xl' : 'text-sm'}>
            <BarChart
              data={topProducts}
              margin={{ top: 90, left: 20, right: 20 }}
            >
              <XAxis dataKey="value" />
              <Bar dataKey="value" animationDuration={600}>
                <LabelList dataKey="name" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Total de Vendas por Categoria" isFullSize={isSlide}>
          <CircularChart data={vendasPorCat} />
        </Card>

        <Card
          title="Total de Vendas por Forma de Pagamento"
          isFullSize={isSlide}
        >
          <CircularChart data={vendasPorPag} />
        </Card>

        <Card title="Total de Vendas por Tipo de Promoção" isFullSize={isSlide}>
          <CircularChart data={vendasPorProm} />
        </Card>

        <Card
          title="Total de Vendas por Campanha de Marketing"
          isFullSize={isSlide}
        >
          <CircularChart data={vendasPorMarketing} />
        </Card>
      </GraphGrid>
    </div>
  );
}

enum SlideState {
  Paused,
  Normal,
  Fast,
}

interface GraphGridProps {
  isSlide: boolean;
  slideState: SlideState;
  children: ReactNode[];
}

function GraphGrid({ isSlide, slideState, children }: GraphGridProps) {
  if (isSlide) {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
      let interval = null;

      if (isSlide && slideState != SlideState.Paused) {
        interval = setInterval(
          () => {
            setSlideIndex(old => (old + 1) % children.length);
          },
          slideState == SlideState.Normal ? 3000 : 1800,
        );
      }

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, [isSlide, slideState]);

    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-zinc-800 p-10">
        {children[slideIndex]}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      {children}

      {/* <Card title="Total de Vendas por Marca">
        <CircularChart data={vendasPorCat} />
      </Card> */}

      {/* <Card title="Total de Vendas por Bairro">
        <CircularChart data={vendasPorCat} />
      </Card> */}
    </div>
  );
}
