import { serve } from 'bun';
import bi from './bi/index.html';
import adm from './adm/index.html';

const server = serve({
  routes: {
    '/*': bi,
    '/adm': adm,
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
