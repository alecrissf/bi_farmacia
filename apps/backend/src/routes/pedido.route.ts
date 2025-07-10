import { Elysia } from 'elysia';
import * as handler from '../handler/pedido.handler';

export const pedidoRoutes = new Elysia({ prefix: '/pedido' })
  .get('/', async () => await handler.findAll())
  .post('/', async ({ body }) => await handler.add(body))
  .get('/:name', async ({ params }) => await handler.findById(params.name))
  .delete(
    '/:name',
    async ({ params }) => await handler.removeById(params.name),
  );
