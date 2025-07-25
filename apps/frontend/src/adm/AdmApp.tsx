import useAsyncMemo from '@/hooks/useAsyncMemo';
import { server } from '@/lib/server';
import { Table } from './components/Table';
import {
  FiBarChart,
  FiPlusSquare,
  FiXSquare,
  FiRefreshCw,
  FiPower,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Inspect } from './components/Inspect';
import { AddRow } from './components/AddRow';
import { EditRow } from './components/EditRow';
import { signOut, useSession } from '@/lib/auth-client';

const tables = [
  {
    name: 'CategoriaProduto',
    get: () => server.categoria.get(),
    inspect: (id: number) => server.categoria({ id }).get(),
    add: (data: any) => server.categoria.add.post(data),
    delete: (id: number) => server.categoria({ id }).delete(),
    update: (id: number, data: any) => server.categoria({ id }).post(data),
    fields: ['nome'],
  },
  {
    name: 'MarcaProduto',
    get: () => server.marca.get(),
    inspect: (id: number) => server.marca({ id }).get(),
    add: (data: any) => server.marca.add.post(data),
    delete: (id: number) => server.marca({ id }).delete(),
    update: (id: number, data: any) => server.marca({ id }).post(data),
    fields: ['nome'],
  },
  {
    name: 'Produto',
    get: () => server.produto.get(),
    inspect: (id: number) => server.produto({ id }).get(),
    add: (data: any) => server.produto.add.post(data),
    delete: (id: number) => server.produto({ id }).delete(),
    update: (id: number, data: any) => server.produto({ id }).post(data),
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
    delete: (id: number) => server.lote({ id }).delete(),
    update: (id: number, data: any) => server.lote({ id }).post(data),
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
    delete: (id: number) => server.cliente({ id }).delete(),
    update: (id: number, data: any) => server.cliente({ id }).post(data),
    fields: ['cpf', 'nome', 'vendas'],
  },
  {
    name: 'Endereco',
    get: () => server.endereco.get(),
    inspect: (id: number) => server.endereco({ id }).get(),
    add: (data: any) => server.endereco.add.post(data),
    delete: (id: number) => server.endereco({ id }).delete(),
    update: (id: number, data: any) => server.endereco({ id }).post(data),
    fields: ['cidade', 'bairro', 'rua', 'numero', 'complemento', 'clienteId'],
  },
  {
    name: 'TipoPagamento',
    get: () => server.pagamento.get(),
    inspect: (id: number) => server.pagamento({ id }).get(),
    add: (data: any) => server.pagamento.add.post(data),
    delete: (id: number) => server.pagamento({ id }).delete(),
    update: (id: number, data: any) => server.pagamento({ id }).post(data),
    fields: ['descricao'],
  },
  {
    name: 'Venda',
    get: () => server.vendas.get(),
    inspect: (id: number) => server.vendas({ id }).get(),
    add: (data: any) => server.vendas.add.post(data),
    delete: (id: number) => server.vendas({ id }).delete(),
    update: (id: number, data: any) => server.vendas({ id }).post(data),
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
    delete: (id: number) => server.pedido({ id }).delete(),
    update: (id: number, data: any) => server.pedido({ id }).post(data),
    fields: ['qtd', 'vendaId', 'produtoId', 'promocaoId'],
  },
  {
    name: 'Promocao',
    get: () => server.promocao.get(),
    inspect: (id: number) => server.promocao({ id }).get(),
    add: (data: any) => server.promocao.add.post(data),
    delete: (id: number) => server.promocao({ id }).delete(),
    update: (id: number, data: any) => server.promocao({ id }).post(data),
    fields: ['nome', 'dataInicio', 'dataFim', 'tipo', 'desconto'],
  },
  {
    name: 'CampanhaMarketing',
    get: () => server.marketing.get(),
    inspect: (id: number) => server.marketing({ id }).get(),
    add: (data: any) => server.marketing.add.post(data),
    delete: (id: number) => server.marketing({ id }).delete(),
    update: (id: number, data: any) => server.marketing({ id }).post(data),
    fields: ['nome', 'dataInicio', 'dataFim', 'tipo'],
  },
];

const userTable = [];

const accountTable = [];

enum PanelState {
  None,
  Inspecting,
  Editing,
  Adding,
}

export function AdmApp() {
  const { data: session, isPending, error, refetch } = useSession();

  const [updateHack, setUpdateHack] = useState(0);

  const [currentTable, setCurrentTable] = useState<(typeof tables)[0]>();
  const [panelState, setPanelState] = useState({
    id: undefined as number | undefined,
    state: PanelState.None,
  });

  const data = useAsyncMemo(
    async () =>
      currentTable !== undefined
        ? currentTable.get().then(({ data }) => data)
        : null,
    [currentTable, updateHack],
  );

  const currentInspection = useAsyncMemo(
    async () =>
      panelState.state !== PanelState.None &&
      panelState.id !== undefined &&
      currentTable !== undefined
        ? currentTable.inspect(panelState.id).then(({ data }) => data)
        : null,
    [panelState, currentTable],
  );

  useEffect(() => {
    setPanelState({ id: undefined, state: PanelState.None });
  }, [currentTable]);

  useEffect(() => {
    if (!isPending && !session) {
      location.pathname = '/login';
    }
  }, [isPending, session]);

  if (!isPending && !session) {
    return (
      <div className="grid h-dvh max-h-dvh w-full grid-cols-[288px_minmax(900px,_1fr)] gap-6 p-10 text-white">
        {error?.message}
      </div>
    );
  }

  return (
    <div className="grid h-dvh max-h-dvh w-full grid-cols-[288px_minmax(900px,_1fr)] gap-6 p-10 text-white">
      <div className="flex h-full max-h-[calc(100dvh-5rem)] min-w-2xs flex-col gap-5 overflow-auto rounded-2xl border-2 border-zinc-500 px-5 py-6">
        <header className="flex flex-col items-center justify-center gap-3 text-2xl font-bold">
          <button
            className="cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            <FiPower
              size={40}
              className="stroke-red-500 hover:stroke-red-700"
            />
          </button>
          {session?.user.name}
        </header>
        <a
          className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-emerald-500 p-2 font-bold"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiBarChart /> BI
        </a>

        <header className="border-b border-zinc-500 py-1 text-center font-bold text-sky-300">
          Tabelas
        </header>
        <div className="flex flex-col gap-1">
          {tables.map((table, index) => (
            <button
              key={table.name}
              className={
                'cursor-pointer rounded-2xl p-2 ' +
                (currentTable?.name === table.name
                  ? ' bg-sky-600 hover:bg-sky-500'
                  : 'hover:bg-zinc-700')
              }
              onClick={() => setCurrentTable(table)}
            >
              {table.name}
            </button>
          ))}
        </div>

        {/* <header className="border-b border-zinc-500 py-1 text-center font-bold text-sky-300">
          Autenticação
        </header>
        <div className="flex flex-col gap-1">
          <button
            className={
              'cursor-pointer rounded-2xl p-2 ' +
              (false ? ' bg-sky-600 hover:bg-sky-500' : 'hover:bg-zinc-700')
            }
            onClick={() => {}}
          >
            Usuarios
          </button>
        </div> */}
      </div>

      <div className="flex h-full max-h-[calc(100dvh-5rem)] w-full flex-row items-center justify-center gap-5">
        <Table
          header={Object.keys(data?.[0] ?? {})}
          data={data ?? []}
          onInspect={id => setPanelState({ id, state: PanelState.Inspecting })}
          onEdit={id => setPanelState({ id, state: PanelState.Editing })}
          onDelete={id => {
            if (currentTable !== undefined) {
              currentTable
                .delete(id)
                .then(() => setUpdateHack(old => (old + 1) % 356));
            }
          }}
        />

        <div className="flex h-full w-3xl flex-col items-center justify-between gap-3 rounded-2xl border-2 border-zinc-500 px-5 py-6">
          {currentTable !== undefined && (
            <header className="top-0 text-2xl font-bold">
              {currentTable.name}
            </header>
          )}

          {currentTable === undefined ? (
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
                onClick={() => setUpdateHack(old => (old + 1) % 356)}
              >
                <FiRefreshCw size={30} /> Atualizar Tabela
              </button>
            </div>
          ) : panelState.state === PanelState.Adding ? (
            <AddRow
              fields={currentTable.fields}
              onAdd={data => {
                currentTable
                  .add(data)
                  .then(() => setUpdateHack(old => (old + 1) % 356));
                setPanelState({ id: undefined, state: PanelState.None });
              }}
            />
          ) : panelState.state === PanelState.Inspecting ? (
            <Inspect data={currentInspection ?? { id: 0 }} />
          ) : panelState.state === PanelState.Editing ? (
            <EditRow
              fields={currentTable.fields}
              data={currentInspection}
              onEdit={(id, data) => {
                currentTable
                  .update(id, data)
                  .then(() => setUpdateHack(old => (old + 1) % 356));
                setPanelState({ id: undefined, state: PanelState.None });
              }}
            />
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
