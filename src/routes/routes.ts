import { RouteOptions } from 'fastify';
import * as Controller from '../controllers';

type RouteConfig = Record<string, RouteOptions>;

const routes: RouteConfig = {
  hello: {
    method: 'GET',
    url: '/',
    handler: (_, reply) => {
      reply.send({ hello: 'World' });
    },
  },
  feed: {
    method: 'GET',
    url: '/feed',
    handler: Controller.getAllPosts,
  },
};

export const renderRoutes = Object.values(routes);
