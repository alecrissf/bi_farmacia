import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByCodigo,
  removeByCodigo,
} from '../handler/lote.handler';
import { prisma } from '../lib/db';

export const loteRoutes = new Elysia({ prefix: '/lote' })
  .get('/', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get(
    '/:id',
    async ({ params: { id } }) => prisma.lote.findUnique({ where: { id } }),
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .get('/codigo/:cod', async ({ params }) => {
    const categoria = await findByCodigo(params.cod);
    return categoria;
  })
  .delete('/codigo/:cod', async ({ params }) => {
    await removeByCodigo(params.cod);
    return {
      response: 'success removed',
    };
  })
  .delete(
    '/:id',
    ({ params: { id } }) => prisma.lote.delete({ where: { id } }),
    { params: t.Object({ id: t.Number() }) },
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
        codigo: t.String(), //string;
        produtoId: t.Number(),
        dataValidade: t.Date(),
        dataRecebimento: t.Date(),
        qtdOriginal: t.Number(),
      }),
    },
  );
