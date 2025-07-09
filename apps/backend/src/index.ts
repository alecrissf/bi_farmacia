import cors from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { auth, OpenAPI } from './lib/auth';

import { categoriaRoutes } from './routes/categoria_produto.route';
import { marcaprodutoRoutes } from './routes/marcaproduto.route';
import { produtoRoutes } from './routes/produto.route';
import { loteRoutes } from './routes/lote.route';
import { clienteRoutes } from './routes/cliente.route';
import { enderecoRoutes } from './routes/endereco.route';
import { tipopagamentoRoutes } from './routes/tipopagamento.route';
import { vendaRoutes } from './routes/venda.route';
import { pedidoRoutes } from './routes/pedido.route';
import { promocaoRoutes } from './routes/promocao.route';
import { campanhamarketingRoutes } from './routes/campanhamarketing.route';

const betterAuth = new Elysia({ name: 'better-auth' })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({ headers });
        if (!session) return status(401);
        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
  .use(cors())
  .use(betterAuth)
  .use(categoriaRoutes)
  .use(marcaprodutoRoutes)
  .use(produtoRoutes)
  .use(loteRoutes)
  .use(clienteRoutes)
  .use(enderecoRoutes)
  .use(tipopagamentoRoutes)
  .use(vendaRoutes)
  .use(pedidoRoutes)
  .use(promocaoRoutes)
  .use(campanhamarketingRoutes)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
