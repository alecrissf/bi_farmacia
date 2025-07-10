import { Elysia, t } from 'elysia';
import {
  findAll,
  findByName,
  removeByName,
  add,
} from '../handler/categoriaproduto.handler';

export const categoriaRoutes = new Elysia()
  .get('/categoria', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get('/categoria/:name', async ({ params }) => {
    const categoria = await findByName(params.name);
    return categoria;
  })
  .delete('/categoria/:name', async ({ params }) => {
    await removeByName(params.name);
    return {
      response: 'success removed',
    };
  })
  .post(
    '/categoria',
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
