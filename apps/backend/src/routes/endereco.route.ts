import { Elysia, t } from 'elysia';
import {findAll, add, findById, removeById} from '../handler/endereco.handler';



export const enderecoRoutes = (app : Elysia ) => {
    app.get('/endereco', async () => {
        const categoria = await findAll();
        return  categoria;   
    }),
    app.get('/endereco/:id', async ({params}) => {
        const categoria = await findById(parseInt(params.id));
        return categoria;
    }),
    app.delete('/endereco/:id', async ({params}) => {
     await removeById(parseInt(params.id));
        return {
        response: 'success removed',
        }
    }),

    app.post('/endereco', async ({body}) => {
        await add(body)
    return {
      response: 'success added',
    }
  }, {
      body: t.Object({
        cidade: t.String(),//string;
        bairro: t.String(),
        rua: t.String(),
        numero: t.Number(),
        complemento: t.String(),
        clienteId: t.Number(), //number;
        })
  })
  return app; 

}
