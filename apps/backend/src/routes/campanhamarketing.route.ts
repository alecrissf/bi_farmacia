import { Elysia, t } from 'elysia';
import { findAll, findByName, removeByName, add } from "../handler/campanhamarketing.handler";

export const campanhamarketingRoutes = (app : Elysia ) => {
  app.get('marketing/', async () => {
          const campanha = await findAll()
          return campanha
  }),
  app.get('marketing/:name', async ({ params }) => 
    { 
        const campanha = await findByName(params.name);
        return campanha;
  }),
  app.delete('marketing/:name', async ({ params }) => 
    {await removeByName(params.name) 
      return {
      response: 'success removed',
      }
    }),
  app.post('/', async ({ body }) => {
    await add(body)
    return {
      response: 'success added',
    }
  }, {
      body: t.Object
      ({
      nome: t.String(),
      dataInicio: t.Date(),
      dataFim:  t.Date(),
      tipo: t.String(),
      }),
    })

  return app; 
  };
  