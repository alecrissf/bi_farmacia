import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findById,
  removeById,
} from '../handler/endereco.handler';
import { prisma } from '../lib/db';

export const enderecoRoutes = new Elysia({ prefix: '/endereco' })
  .get('/', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get('/:id', async ({ params }) => {
    const categoria = await findById(parseInt(params.id));
    return categoria;
  })
  .delete('/:id', async ({ params }) => {
    await removeById(parseInt(params.id));
    return {
      response: 'success removed',
    };
  })
  .post(
    '/:id',
    ({ params: { id }, body }) =>
      prisma.endereco.update({ where: { id }, data: body }),
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({
        cidade: t.String(), //string;
        bairro: t.String(),
        rua: t.String(),
        numero: t.Number(),
        complemento: t.String(),
        clienteId: t.Number(), //number;
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
        cidade: t.String(), //string;
        bairro: t.String(),
        rua: t.String(),
        numero: t.Number(),
        complemento: t.String(),
        clienteId: t.Number(), //number;
      }),
    },
  );
