import { Elysia , t} from 'elysia';
import { findAll, add,findByCodigo, removeByCodigo } from '../handler/lote.handler';


export const loteRoutes = (app : Elysia ) => {
    app.get('/lote', async () => {
        const categoria = await findAll();
        return  categoria;   
    }),
    app.get('/lote/:id', async ({params}) => {
        const categoria = await findByCodigo(parseInt(params.id));
        return categoria;
    }),
    app.delete('/lote/:id', async ({params}) => {
     await removeByCodigo(parseInt(params.id));
        return {
        response: 'success removed',
        }
    }),

    app.post('/lote', async ({body}) => {
        await add(body)
    return {
      response: 'success added',
    }
  }, {
      body: t.Object({
        codigo: t.String(),//string;
        produtoId: t.Number(),
        dataValidade: t.Date(),
        dataRecebimento: t.Date(),
        qtdOriginal: t.Number(),
      })
  })
  return app; 

}