import useAsyncMemo from '@/hooks/useAsyncMemo';
import { server } from '@/lib/server';
import { Table } from './components/Table';
import { FiBarChart, FiPlusSquare, FiXSquare } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const tables = [
  { name: 'CategoriaProduto', get: () => server.categoria.get() },
  { name: 'MarcaProduto', get: () => server.marca.get() },
  { name: 'Produto', get: () => server.produto.get() },
  { name: 'Lote', get: () => server.lote.get() },
  { name: 'Cliente', get: () => server.cliente.get() },
  { name: 'Endereco', get: () => server.endereco.get() },
  { name: 'TipoPagamento', get: () => server.pagamento.get() },
  { name: 'Venda', get: () => server.vendas.get() },
  { name: 'Pedido', get: () => server.pedido.get() },
  { name: 'Promocao', get: () => server.promocao.get() },
  { name: 'CampanhaMarketing', get: () => server.marketing.get() },
];

enum PanelState {
  None,
  Inspecting,
  Editing,
  Adding,
}

export function AdmApp() {
  const [tableIndex, setTableIndex] = useState<number>();
  const [panelState, setPanelState] = useState({
    id: undefined as number | undefined,
    state: PanelState.None,
  });

  const data = useAsyncMemo(
    async () =>
      tableIndex !== undefined
        ? tables[tableIndex].get().then(({ data }) => data)
        : null,
    [tableIndex],
  );

  useEffect(() => {
    setPanelState({ id: undefined, state: PanelState.None });
  }, [tableIndex]);

  return (
    <div className="grid h-dvh max-h-dvh w-full grid-cols-[288px_minmax(900px,_1fr)] gap-6 p-10 text-white">
      <div className="flex h-full max-h-[calc(100dvh-5rem)] min-w-2xs flex-col gap-5 rounded-2xl border-2 border-zinc-500 px-5 py-6">
        <header className="flex items-center justify-center gap-3 text-2xl font-bold">
          Admin
        </header>
        <a
          className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-emerald-500 p-2 font-bold"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiBarChart /> BI
        </a>
        <header className="border-b border-zinc-500 py-1 text-center">
          Tabelas
        </header>
        <div className="flex flex-col gap-1">
          {tables.map((table, index) => (
            <button
              key={table.name}
              className={
                'cursor-pointer rounded-2xl p-2 ' +
                (tableIndex === index
                  ? ' bg-sky-600 hover:bg-sky-500'
                  : 'hover:bg-zinc-700')
              }
              onClick={() => setTableIndex(index)}
            >
              {table.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex h-full max-h-[calc(100dvh-5rem)] w-full flex-row items-center justify-center gap-5">
        <Table
          header={Object.keys(data?.[0] ?? {})}
          data={data ?? []}
          onInspect={id => setPanelState({ id, state: PanelState.Inspecting })}
          onEdit={id => setPanelState({ id, state: PanelState.Editing })}
          onDelete={id => {}}
        />

        <div className="flex h-full w-3xl flex-col items-center justify-center gap-3 rounded-2xl border-2 border-zinc-500 px-5 py-6">
          {tableIndex === undefined ? (
            <></>
          ) : panelState.state === PanelState.None ? (
            <button
              className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-3 py-2 font-bold"
              onClick={() =>
                setPanelState({ id: undefined, state: PanelState.Adding })
              }
            >
              <FiPlusSquare size={30} /> Adicionar Linha
            </button>
          ) : panelState.state === PanelState.Adding ? (
            <div>Adicionando</div>
          ) : panelState.state === PanelState.Inspecting ? (
            <div>Inspecionando</div>
          ) : panelState.state === PanelState.Editing ? (
            <div>Editando</div>
          ) : (
            <div>Invalid State????</div>
          )}

          {panelState.state !== PanelState.None && (
            <button
              className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-red-400 px-3 py-2 font-bold"
              onClick={() =>
                setPanelState({ id: undefined, state: PanelState.None })
              }
            >
              <FiXSquare size={30} /> Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
