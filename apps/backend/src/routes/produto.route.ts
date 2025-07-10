import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByCodBarras,
  removeByCodBarras,
} from '../handler/produto.handler';
import { prisma } from '../lib/db';

export const produtoRoutes = new Elysia()
  .get('/produto', async () => {
    const pedidos = await findAll();
    return pedidos;
  })
  .get(
    '/produto/top/:n',
    async ({ params: { n } }) =>
      prisma.produto.findMany({
        orderBy: {
          pedidos: {
            _count: 'desc',
          },
        },
        include: {
          _count: {
            select: {
              pedidos: true,
            },
          },
        },
        take: n,
      }),
    {
      params: t.Object({
        n: t.Integer(),
      }),
    },
  )
  .get('/produto/:code', async ({ params }) => {
    const pedido = await findByCodBarras(params.code);
    return pedido;
  })
  .delete('/produto/:code', async ({ params }) => {
    await removeByCodBarras(params.code);
    return {
      response: 'success removed',
    };
  })
  .post(
    '/produto',
    async ({ body }) => {
      await add(body);
      return {
        response: 'success added',
      };
    },
    {
      body: t.Object({
        codBarras: t.String(),
        nome: t.String(),
        preco: t.Number(),
        qtdEstoque: t.Number(),
        categoriaId: t.Number(),
        marcaId: t.Number(),
      }),
    },
  );
