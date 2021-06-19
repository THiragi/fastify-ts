import { fastify, FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { Static, Type } from '@sinclair/typebox';
import BlogRoutes from './routes/blogs';

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
});

const BodyScheme = Type.Object({
  title: Type.String(),
});

type BodyType = Static<typeof BodyScheme>;

const ResponseSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
});

const options: RouteShorthandOptions = {
  schema: {
    body: BodyScheme,
    response: {
      200: ResponseSchema,
    },
  },
};

app.get('/', (_, reply) => {
  reply.send({ hello: 'World' });
});

BlogRoutes.forEach((route) => {
  app.route(route);
});

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
