import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import { modelRoutes } from './modules/models/routes';

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: '*' });
fastify.register(multipart);
fastify.register(modelRoutes, { prefix: '/models' });

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' });
    console.log('🚀 Fastify server running on http://localhost:4000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); 