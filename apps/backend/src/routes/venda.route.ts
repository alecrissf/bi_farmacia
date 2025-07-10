import { Elysia, t } from 'elysia';
import { findAll, add, findById, removeById } from '../handler/venda.handler';
import { prisma } from '../lib/db';

export const vendasRoutes = new Elysia()
  .get('/vendas', async () => {
    const pedidos = await findAll();
    return pedidos;
  })
  .get('/vendas/:id', async ({ params }) => {
    const pedido = await findById(parseInt(params.id));
    return pedido;
  })
  .delete('/vendas/:id', async ({ params }) => {
    await removeById(parseInt(params.id));
    return {
      response: 'success removed',
    };
  })
  .post(
    '/vendas',
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
