import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByCpf,
  removeByCpf,
} from '../handler/cliente.handler';

export const clienteRoutes = new Elysia()
  .get('/cliente', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get('/cliente/:cpf', async ({ params }) => {
    const categoria = await findByCpf(params.cpf);
    return categoria;
  })
  .delete('/cliente/:cpf', async ({ params }) => {
    await removeByCpf(params.cpf);
    return {
      response: 'success removed',
    };
  })
  .post(
    '/cliente',
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
