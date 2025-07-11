import { Elysia, t } from 'elysia';
import { findAll, add, findById, removeById } from '../handler/venda.handler';
import { prisma } from '../lib/db';

export const vendasRoutes = new Elysia({ prefix: '/vendas' })
  .get('/', async () => {
    const pedidos = await findAll();
    return pedidos;
  })
  .get('/ext', () =>
    prisma.venda.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        tipoPagamento: true,
        campanhaMarketing: true,
        pedidos: {
          include: {
            produto: { include: { categoria: true } },
            promocao: true,
          },
        },
      },
    }),
  )
  .get('/:id', async ({ params }) => {
    const pedido = await findById(parseInt(params.id));
    return pedido;
  })
  .delete('/:id', async ({ params }) => {
    await removeById(parseInt(params.id));
    return {
      response: 'success removed',
    };
  })
  .post(
    '/:id',
    ({ params: { id }, body }) =>
      prisma.venda.update({ where: { id }, data: body }),
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({
        dataVenda: t.Date(),
        clienteId: t.Number(),
        tipoPagamentoId: t.Number(),
        campanhaMarketingId: t.Number(),
      }),
    },
  )
  .post(
    '/add',
    async ({ body }) => {
      await add(body);
      return {
        response: 'success added',
      };
    },
    {
      body: t.Object({
        dataVenda: t.Date(),
        clienteId: t.Number(),
        tipoPagamentoId: t.Number(),
        campanhaMarketingId: t.Number(),
      }),
    },
  );
