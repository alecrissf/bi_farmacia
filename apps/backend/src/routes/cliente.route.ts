import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByCpf,
  removeByCpf,
} from '../handler/cliente.handler';
import { prisma } from '../lib/db';

export const clienteRoutes = new Elysia({ prefix: '/cliente' })
  .get('/', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get(
    '/:id',
    async ({ params: { id } }) => prisma.cliente.findUnique({ where: { id } }),
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .get('/cpf/:cpf', async ({ params }) => {
    const categoria = await findByCpf(params.cpf);
    return categoria;
  })
  .delete('/cpf/:cpf', async ({ params }) => {
    await removeByCpf(params.cpf);
    return {
      response: 'success removed',
    };
  })
  .delete(
    '/:id',
    ({ params: { id } }) => prisma.cliente.delete({ where: { id } }),
    { params: t.Object({ id: t.Number() }) },
  )
  .post(
    '/:id',
    ({ params: { id }, body }) =>
      prisma.cliente.update({ where: { id }, data: body }),
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({
        cpf: t.String(),
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
        cpf: t.String(),
        nome: t.String(),
      }),
    },
  );
