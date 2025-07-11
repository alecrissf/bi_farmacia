import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByName,
  removeByName,
} from '../handler/promocao.handler';
import { prisma } from '../lib/db';
import { TipoPromocao } from '../generated/prisma';

export const promocaoRoutes = new Elysia({ prefix: '/promocao' })
  .get('/', async () => {
    const pedidos = await findAll();
    return pedidos;
  })
  .get(
    '/:id',
    async ({ params: { id } }) => prisma.promocao.findUnique({ where: { id } }),
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .get('/name/:name', async ({ params }) => {
    const pedido = await findByName(params.name);
    return pedido;
  })
  .delete('/name/:name', async ({ params }) => {
    await removeByName(params.name);
    return {
      response: 'success removed',
    };
  })
  .delete(
    '/:id',
    ({ params: { id } }) => prisma.promocao.delete({ where: { id } }),
    { params: t.Object({ id: t.Number() }) },
  )
  .post(
    '/:id',
    ({ params: { id }, body }) =>
      prisma.promocao.update({ where: { id }, data: body }),
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({
        nome: t.String(),
        dataInicio: t.Date(),
        dataFim: t.Date(),
        tipo: t.Enum(TipoPromocao),
        desconto: t.Number(),
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
        tipo: t.Enum(TipoPromocao),
        desconto: t.Number(),
      }),
    },
  );
