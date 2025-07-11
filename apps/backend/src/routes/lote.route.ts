import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByCodigo,
  removeByCodigo,
} from '../handler/lote.handler';

export const loteRoutes = new Elysia({ prefix: '/lote' })
  .get('/', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get('/:id', async ({ params }) => {
    const categoria = await findByCodigo(params.id);
    return categoria;
  })
  .delete('/:id', async ({ params }) => {
    await removeByCodigo(params.id);
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
        codigo: t.String(), //string;
        produtoId: t.Number(),
        dataValidade: t.Date(),
        dataRecebimento: t.Date(),
        qtdOriginal: t.Number(),
      }),
    },
  );
