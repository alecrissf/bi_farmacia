import { Elysia, t } from 'elysia';
import {
  findAll,
  add,
  findByCodBarras,
  removeByCodBarras,
} from '../handler/produto.handler';
import { prisma } from '../lib/db';

export const produtoRoutes = new Elysia({ prefix: '/produto' })
  .get('/', async () => {
    const pedidos = await findAll();
    return pedidos;
  })
  .get(
    '/:id',
    async ({ params: { id } }) => prisma.produto.findUnique({ where: { id } }),
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .get(
    '/top/:n',
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
  .get('/code/:code', async ({ params }) => {
    const pedido = await findByCodBarras(params.code);
    return pedido;
  })
  .delete('/code/:code', async ({ params }) => {
    await removeByCodBarras(params.code);
    return {
      response: 'success removed',
    };
  })
  .delete(
    '/:id',
    ({ params: { id } }) => prisma.produto.delete({ where: { id } }),
    { params: t.Object({ id: t.Number() }) },
  )
  .post(
    '/:id',
    ({ params: { id }, body }) =>
      prisma.produto.update({ where: { id }, data: body }),
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({
        codBarras: t.String(),
        nome: t.String(),
        preco: t.Number(),
        qtdEstoque: t.Number(),
        categoriaId: t.Number(),
        marcaId: t.Number(),
      }),
    },
  )
  .post(
    '/add',
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
