import { Elysia } from 'elysia';
import * as handler from '../handler/produto.handler';

export const produtoRoutes = new Elysia({ prefix: '/produto' })
  .get('/', async () => await handler.findAll())
  .post('/', async ({ body }) => await handler.add(body))
  .get(
    '/:name',
    async ({ params }) => await handler.findByCodBarras(params.name),
  )
  .delete(
    '/:name',
    async ({ params }) => await handler.removeByCodBarras(params.name),
  );
