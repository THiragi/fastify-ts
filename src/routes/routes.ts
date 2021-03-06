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
  users: {
    method: 'GET',
    url: '/users',
    handler: Controller.getAllUsers,
  },
  user: {
    method: 'GET',
    url: '/user/:id',
    handler: Controller.getUser,
  },
};

export const renderRoutes = Object.values(routes);
