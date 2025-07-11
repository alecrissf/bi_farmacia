import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByPayment,
  removeByPayment,
} from '../handler/tipopagamento.handler';

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
    '/add',
    async ({ body }) => {
      await add(body);
      return {
        response: 'success added',
      };
    },
    {
      body: t.Object({
        vendas: t.Number(),
        descricao: t.String(),
      }),
    },
  );
