import { Elysia , t } from 'elysia';
import { findAll, add, findById,removeById} from '../handler/venda.handler';

export const vendasRoutes = (app: Elysia) => {
    app.get('/vendas', async () => {
        const pedidos = await findAll();
        return pedidos;
    });

    app.get('/vendas/:id', async ({ params }) => {
        const pedido = await findById(parseInt(params.id));
        return pedido;
    });

    app.delete('/vendas/:id', async ({ params }) => {
        await removeById(parseInt(params.id));
        return {
            response: 'success removed',
        };
    });

    app.post('/vendas', async ({ body }) => {
        await add(body);
        return {
            response: 'success added',
        };
    }, 
    {  body: t.Object({
        dataVenda: t.Date(),
        clienteId: t.Number(),
        tipoPagamentoId: t.Number(),
        campanhaMarketingId: t.Number()
        })
    });
  return app;
};
