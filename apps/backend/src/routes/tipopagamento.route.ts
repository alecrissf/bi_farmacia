import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByPayment,
  removeByPayment,
} from '../handler/tipopagamento.handler';
import { prisma } from '../lib/db';

export const tipoPagamentoRoutes = new Elysia({ prefix: '/pagamento' })
  .get('/', async () => {
    const pedidos = await findAll();
    return pedidos;
  })
  .get('/:id', async ({ params }) => {
    const pedido = await findByPayment(parseInt(params.id));
    return pedido;
  })
  .delete('/:id', async ({ params }) => {
    await removeByPayment(parseInt(params.id));
    return {
      response: 'success removed',
    };
  })
  .post(
    '/:id',
    ({ params: { id }, body }) =>
      prisma.tipoPagamento.update({ where: { id }, data: body }),
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({
        descricao: t.String(),
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
        descricao: t.String(),
      }),
    },
  );
