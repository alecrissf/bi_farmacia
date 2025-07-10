import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByName,
  removeByName,
} from '../handler/marcaproduto.handler';

export const marcasProdutosRoutes = new Elysia()
  .get('/marca', async () => {
    const categoria = await findAll();
    return categoria;
  })
  .get('/marca/:name', async ({ params }) => {
    const categoria = await findByName(params.name);
    return categoria;
  })
  .delete('/marca/:name', async ({ params }) => {
    await removeByName(params.name);
    return {
      response: 'success removed',
    };
  })
  .post(
    '/marca',
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
