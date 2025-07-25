import { Elysia, t } from 'elysia';
import {
  findAll,
  findByName,
  removeByName,
  add,
} from '../handler/campanhamarketing.handler';
import { prisma } from '../lib/db';

export const campanhamarketingRoutes = new Elysia({ prefix: '/marketing' })
  .get('/', async () => {
    const campanha = await findAll();
    return campanha;
  })
  .get(
    '/:id',
    async ({ params: { id } }) =>
      prisma.campanhaMarketing.findUnique({ where: { id } }),
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .get('/name/:name', async ({ params }) => {
    const campanha = await findByName(params.name);
    return campanha;
  })
  .delete(
    '/name/:name',
    async ({ params }) => {
      await removeByName(params.name);
      return {
        response: 'success removed',
      };
    },
    { params: t.Object({ name: t.String() }) },
  )
  .delete(
    '/:id',
    ({ params: { id } }) => prisma.campanhaMarketing.delete({ where: { id } }),
    { params: t.Object({ id: t.Number() }) },
  )
  .post(
    '/:id',
    ({ params: { id }, body }) =>
      prisma.campanhaMarketing.update({ where: { id }, data: body }),
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({
        nome: t.String(),
        dataInicio: t.Date(),
        dataFim: t.Date(),
        tipo: t.String(),
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
        dataInicio: t.Date(),
        dataFim: t.Date(),
        tipo: t.String(),
      }),
    },
  );
