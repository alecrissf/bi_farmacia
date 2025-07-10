import { Elysia } from 'elysia';
import * as handler from '../handler/lote.handler';

export const loteRoutes = new Elysia({ prefix: '/lote' })
  .get('/', async () => await handler.findAll())
  .post('/', async ({ body }) => await handler.add(body))
  .get('/:name', async ({ params }) => await handler.findByCodigo(params.name))
  .delete(
    '/:name',
    async ({ params }) => await handler.removeByCodigo(params.name),
  );
