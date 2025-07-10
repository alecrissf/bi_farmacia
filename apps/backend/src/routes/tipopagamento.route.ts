import { Elysia } from 'elysia';
import * as handler from '../handler/tipopagamento.handler';

export const tipopagamentoRoutes = new Elysia({ prefix: '/tipopagamento' })
  .get('/', async () => await handler.findAll())
  .post('/', async ({ body }) => await handler.add(body))
  .get(
    '/:name',
    async ({ params }) => await handler.findByDescricao(params.name),
  )
  .delete(
    '/:name',
    async ({ params }) => await handler.removeByDescricao(params.name),
  );
