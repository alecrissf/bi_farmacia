import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findById,
  removeById,
} from '../handler/endereco.handler';

export const enderecoRoutes = new Elysia()
  .get('/endereco', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get('/endereco/:id', async ({ params }) => {
    const categoria = await findById(parseInt(params.id));
    return categoria;
  })
  .delete('/endereco/:id', async ({ params }) => {
    await removeById(parseInt(params.id));
    return {
      response: 'success removed',
    };
  })
  .post(
    '/endereco',
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
