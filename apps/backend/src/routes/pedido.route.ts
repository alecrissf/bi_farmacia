import { Elysia, t } from 'elysia';
import { findAll, add, findById, removeById } from '../handler/pedido.handler';

export const pedidoRoutes = new Elysia({ prefix: '/pedido' })
  .get('/', async () => {
    const pedidos = await findAll();
    return pedidos;
  })
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
    '/add',
    async ({ body }) => {
      await add(body);
      return {
        response: 'success added',
      };
    },
    {
      body: t.Object({
        qtd: t.Number(),
        vendaId: t.Number(),
        produtoId: t.Number(),
        promocaoId: t.Optional(t.Number()),
      }),
    },
  );
