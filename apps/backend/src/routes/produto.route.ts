import { Elysia , t } from 'elysia';
import { findAll, add, findByCodBarras, removeByCodBarras } from '../handler/produto.handler'

export const produtoRoutes = (app: Elysia) => {
    app.get('/produto', async () => {
        const pedidos = await findAll();
        return pedidos;
    });

    app.get('/produto/:code', async ({ params }) => {
        const pedido = await findByCodBarras(params.code);
        return pedido;
    });

    app.delete('/produto/:code', async ({ params }) => {
        await removeByCodBarras(params.code);
        return {
            response: 'success removed',
        };
    });

    app.post('/produto', async ({ body }) => {
        await add(body);
        return {
            response: 'success added',
        };
    }, 
    {  body: t.Object({
            codBarras: t.String(),
            nome: t.String(),
            preco: t.Number(),
            qtdEstoque: t.Number(),
            categoriaId: t.Number(),
            marcaId: t.Number()
        })
    });

    return app;
};