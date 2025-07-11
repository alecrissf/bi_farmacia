import useAsyncMemo from '@/hooks/useAsyncMemo';
import { server } from '@/lib/server';
import { Table } from './components/Table';
import {
  FiBarChart,
  FiPlusSquare,
  FiXSquare,
  FiRefreshCw,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Inspect } from './components/Inspect';
import { AddRow } from './components/AddRow';

const tables = [
  {
    name: 'CategoriaProduto',
    get: () => server.categoria.get(),
    inspect: (id: number) => server.categoria({ id }).get(),
    add: (data: any) => server.categoria.add.post(data),
    fields: ['nome'],
  },
  {
    name: 'MarcaProduto',
    get: () => server.marca.get(),
    inspect: (id: number) => server.marca({ id }).get(),
    add: (data: any) => server.marca.add.post(data),
    fields: ['nome'],
  },
  {
    name: 'Produto',
    get: () => server.produto.get(),
    inspect: (id: number) => server.produto({ id }).get(),
    add: (data: any) => server.produto.add.post(data),
    fields: [
      'codBarras',
      'nome',
      'preco',
      'qtdEstoque',
      'categoriaId',
      'marcaId',
    ],
  },
  {
    name: 'Lote',
    get: () => server.lote.get(),
    inspect: (id: number) => server.lote({ id }).get(),
    add: (data: any) => server.lote.add.post(data),
    fields: [
      'codigo',
      'produtoId',
      'produto',
      'dataValidade',
      'dataRecebimento',
      'qtdOriginal',
    ],
  },
  {
    name: 'Cliente',
    get: () => server.cliente.get(),
    inspect: (id: number) => server.cliente({ id }).get(),
    add: (data: any) => server.cliente.add.post(data),
    fields: ['cpf', 'nome', 'vendas'],
  },
  {
    name: 'Endereco',
    get: () => server.endereco.get(),
    inspect: (id: number) => server.endereco({ id }).get(),
    add: (data: any) => server.endereco.add.post(data),
    fields: ['cidade', 'bairro', 'rua', 'numero', 'complemento', 'clienteId'],
  },
  {
    name: 'TipoPagamento',
    get: () => server.pagamento.get(),
    inspect: (id: number) => server.pagamento({ id }).get(),
    add: (data: any) => server.pagamento.add.post(data),
    fields: ['descricao'],
  },
  {
    name: 'Venda',
    get: () => server.vendas.get(),
    inspect: (id: number) => server.vendas({ id }).get(),
    add: (data: any) => server.vendas.add.post(data),
    fields: [
      'dataVenda',
      'clienteId',
      'tipoPagamentoId',
      'pedidos',
      'campanhaMarketingId',
    ],
  },
  {
    name: 'Pedido',
    get: () => server.pedido.get(),
    inspect: (id: number) => server.pedido({ id }).get(),
    add: (data: any) => server.pedido.add.post(data),
    fields: ['qtd', 'vendaId', 'produtoId', 'promocaoId'],
  },
  {
    name: 'Promocao',
    get: () => server.promocao.get(),
    inspect: (id: number) => server.promocao({ id }).get(),
    add: (data: any) => server.promocao.add.post(data),
    fields: ['nome', 'dataInicio', 'dataFim', 'tipo', 'desconto'],
  },
  {
    name: 'CampanhaMarketing',
    get: () => server.marketing.get(),
    inspect: (id: number) => server.marketing({ id }).get(),
    add: (data: any) => server.marketing.add.post(data),
    fields: ['nome', 'dataInicio', 'dataFim', 'tipo'],
  },
];

enum PanelState {
  None,
  Inspecting,
  Editing,
  Adding,
}

export function AdmApp() {
  const [updateHack, setUpdateHack] = useState(true);

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
    [tableIndex, updateHack],
  );

  const currentInspection = useAsyncMemo(
    async () =>
      panelState.state !== PanelState.None &&
      panelState.id !== undefined &&
      tableIndex !== undefined
        ? tables[tableIndex].inspect(panelState.id).then(({ data }) => data)
        : null,
    [panelState, tableIndex],
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

        <div className="flex h-full w-3xl flex-col items-center justify-between gap-3 rounded-2xl border-2 border-zinc-500 px-5 py-6">
          {tableIndex !== undefined && (
            <header className="top-0 text-2xl font-bold">
              {tables[tableIndex].name}
            </header>
          )}

          {tableIndex === undefined ? (
            <></>
          ) : panelState.state === PanelState.None ? (
            <div className="flex flex-row items-center justify-center gap-3">
              <button
                className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-3 py-2 font-bold"
                onClick={() =>
                  setPanelState({ id: undefined, state: PanelState.Adding })
                }
              >
                <FiPlusSquare size={30} /> Adicionar Linha
              </button>

              <button
                className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-sky-500 px-3 py-2 font-bold"
                onClick={() => setUpdateHack(old => !old)}
              >
                <FiRefreshCw size={30} /> Atualizar Tabela
              </button>
            </div>
          ) : panelState.state === PanelState.Adding ? (
            <AddRow
              fields={tables[tableIndex].fields}
              onAdd={data => {
                tables[tableIndex].add(data);
                setPanelState({ id: undefined, state: PanelState.None });
                setUpdateHack(old => !old);
              }}
            />
          ) : panelState.state === PanelState.Inspecting ? (
            <Inspect data={currentInspection ?? { id: 0 }} />
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
