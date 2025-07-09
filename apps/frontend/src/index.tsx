import { serve } from 'bun';
import bi from './bi/index.html';
import adm from './adm/index.html';
import login from './login/index.html';

const server = serve({
  routes: {
    '/*': bi,
    '/adm': adm,
    '/login': login,
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },

  port: 3333,
});

console.log(`🚀 Server running at ${server.url}`);
