import { Elysia, t } from 'elysia';
import {
  findAll,
  findByName,
  removeByName,
  add,
} from '../handler/campanhamarketing.handler';

export const campanhamarketingRoutes = new Elysia()
  .get('marketing/', async () => {
    const campanha = await findAll();
    return campanha;
  })
  .get('marketing/:name', async ({ params }) => {
    const campanha = await findByName(params.name);
    return campanha;
  })
  .delete('marketing/:name', async ({ params }) => {
    await removeByName(params.name);
    return {
      response: 'success removed',
    };
  })
  .post(
    '/marketing',
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
