import {Elysia, t} from 'elysia';
import { findAll, findByName, removeByName, add } from "../handler/categoriaproduto.handler";

export const categoriaRoutes = (app : Elysia ) => {
    app.get('/categoria', async () => {
        const categoria = await findAll();
        return  categoria;   
    }),
    app.get('/categoria/:name', async ({params}) => {
        const categoria = await findByName(params.name);
        return categoria;
    }),
    app.delete('/categoria/:name', async ({params}) => {
     await removeByName(params.name);
        return {
        response: 'success removed',
        }
    }),

    app.post('/categoria', async ({body}) => {
        await add(body)
    return {
      response: 'success added',
    }
  }, {
      body: t.Object({
      nome: t.String(),
      produtos: t.ArrayString(),
      promocoes: t.ArrayString(),
     
    })
  })
  return app; // <--- ESSA LINHA É A CORREÇÃO PRINCIPAL

}