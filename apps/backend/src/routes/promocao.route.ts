import { Elysia , t } from 'elysia';
import { findAll, add, findByCodBarras, removeByCodBarras } from '../handler/produto.handler'

export const promocaoRoutes = (app: Elysia) => {
    app.get('/promocao', async () => {
        const pedidos = await findAll();
        return pedidos;
    });

    app.get('/promocao/:code', async ({ params }) => {
        const pedido = await findByCodBarras(params.code);
        return pedido;
    });

    app.delete('/promocao/:name', async ({ params }) => {
        await removeByCodBarras(params.name);
        return {
            response: 'success removed',
        };
    });

    app.post('/promocao', async ({ body }) => {
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