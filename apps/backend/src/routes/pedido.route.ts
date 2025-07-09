import { Elysia, t } from 'elysia';
import { findAll, add, findById, removeById } from '../handler/pedido.handler';

export const pedidoRoutes = (app: Elysia) => {
    app.get('/pedido', async () => {
        const pedidos = await findAll();
        return pedidos;
    });

    app.get('/pedido/:id', async ({ params }) => {
        const pedido = await findById(parseInt(params.id));
        return pedido;
    });

    app.delete('/pedido/:id', async ({ params }) => {
        await removeById(parseInt(params.id));
        return {
            response: 'success removed',
        };
    });

    app.post('/pedido', async ({ body }) => {
        await add(body);
        return {
            response: 'success added',
        };
    }, {
        body: t.Object({
            qtd: t.Number(),
            vendaId: t.Number(),
            produtoId: t.Number(),
            promocaoId: t.Optional(t.Number())
        })
    });

    return app;
};