// src/main.ts
import fastify from 'fastify';
import cors from '@fastify/cors';
import moviesRouter from './routes/movies'; // adjust path if needed

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const app = fastify({ logger: true });

await app.register(cors, { origin: true });

// Mount the movies router at /api/movies
// If your router exports a Fastify plugin, register it; if it's an Express-style router, adapt accordingly.
await app.register(moviesRouter, { prefix: '/api/movies' });

// Health endpoint
app.get('/health', async () => ({ ok: true }));

// Debug: list registered routes (Fastify)
app.get('/_routes', async () => {
  const routes: string[] = [];
  app.printRoutes({ commonPrefix: false }).split('\n').forEach(line => {
    if (line.trim()) routes.push(line.trim());
  });
  return { routes };
});

try {
  await app.listen({ port: PORT, host: HOST });
  app.log.info(`Server listening on ${HOST}:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
