import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { renderRoutes } from './routes';

export const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _,
  next
) => {
  renderRoutes.forEach((route) => {
    fastify.route(route);
  });
  next();
};
