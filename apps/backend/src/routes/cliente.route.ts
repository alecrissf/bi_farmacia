import { Elysia, t } from 'elysia';
import {findAll, add, findByName, removeByName}  from '../handler/cliente.handler';

export const clienteRoutes = (app : Elysia ) => {
    app.get('/cliente', async () => {
        const categoria = await findAll();
        return  categoria;   
    }),
    app.get('/cliente/:name', async ({params}) => {
        const categoria = await findByName(params.name);
        return categoria;
    }),
    app.delete('/cliente/:name', async ({params}) => {
     await removeByName(params.name);
        return {
        response: 'success removed',
        }
    }),

    app.post('/cliente', async ({body}) => {
        await add(body)
    return {
      response: 'success added',
    }
  }, {
      body: t.Object({
      cpf: t.String(),
      nome: t.String()
        })
  })
  return app; 

}