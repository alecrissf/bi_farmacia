import cors from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia, replaceUrlPath } from 'elysia';
import { auth, OpenAPI } from './lib/auth';
import { categoriaRoutes } from './routes/categoria_produto.route'; // Ajuste a importação se necessário
export const categoriaRoutes = new Elysia({ prefix: '/categorias' })
    .get('/', () => 'Hello from categorias');

const betterAuth = new Elysia({ name: 'better-auth' })
    .mount(auth.handler)
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await auth.api.getSession({
                    headers,
                });

                if (!session) return status(401);

                return {
                    user: session.user,
                    session: session.session,
                };
            },
        },
    });

// A instância 'categoria' não é necessária se você for montar diretamente categoriaRoutes no 'app'
// const categoria = new Elysia({ name: 'better-auth' }); // Esta linha estava com erro de sintaxe e não usada

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
    .get('/auth', () => 'Hello Elysia', { auth: false })
    .use(categoriaRoutes) // <-- Adicione esta linha para montar as rotas de categoria
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

// Você tem este console.log duplicado, pode remover um
// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
// );