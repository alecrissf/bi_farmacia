import { Elysia } from 'elysia';
import * as handler from '../handler/cliente.handler';

export const clienteRoutes = new Elysia({ prefix: '/cliente' })
  .get('/', async () => await handler.findAll())
  .post('/', async ({ body }) => await handler.add(body))
  .get('/:name', async ({ params }) => await handler.findByCpf(params.name))
  .delete(
    '/:name',
    async ({ params }) => await handler.removeByCpf(params.name),
  );
