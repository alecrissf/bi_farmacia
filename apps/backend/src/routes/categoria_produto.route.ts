import { Elysia, t } from 'elysia';
import {
  findAll,
  findByName,
  removeByName,
  add,
} from '../handler/categoriaproduto.handler';
import { prisma } from '../lib/db';

export const categoriaRoutes = new Elysia({ prefix: '/categoria' })
  .get('/', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get(
    '/:id',
    async ({ params: { id } }) =>
      prisma.categoriaProduto.findUnique({ where: { id } }),
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .get('/name/:name', async ({ params }) => {
    const categoria = await findByName(params.name);
    return categoria;
  })
  .delete('/name/:name', async ({ params }) => {
    await removeByName(params.name);
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
      body: t.Object({ nome: t.String() }),
    },
  );
