import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByName,
  removeByName,
} from '../handler/marcaproduto.handler';
import { prisma } from '../lib/db';

export const marcasProdutosRoutes = new Elysia({ prefix: '/marca' })
  .get('/', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get(
    '/:id',
    async ({ params: { id } }) =>
      prisma.marcaProduto.findUnique({ where: { id } }),
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
  .delete(
    '/:id',
    ({ params: { id } }) => prisma.marcaProduto.delete({ where: { id } }),
    { params: t.Object({ id: t.Number() }) },
  )
  .post(
    '/:id',
    ({ params: { id }, body }) =>
      prisma.marcaProduto.update({ where: { id }, data: body }),
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({
        nome: t.String(),
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
        nome: t.String(),
      }),
    },
  );
