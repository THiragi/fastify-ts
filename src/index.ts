import { fastify, FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { PrismaClient } from '@prisma/client';
import { resolve } from 'path/posix';
import { Static, Type } from '@sinclair/typebox';
// import BlogRoutes from './routes/blogs';

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
});

const prisma = new PrismaClient();

const BodyScheme = Type.Object({
  title: Type.String(),
  content: Type.String(),
  authorEmail: Type.String(),
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

app.get('/feed', async (_, reply) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  reply.send(posts);
});

app.post<{ Body: BodyType }>(`/post`, options, async (request, reply) => {
  const { title, content, authorEmail } = request.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  });
  reply.send(result);
});

// BlogRoutes.forEach((route) => {
//   app.route(route);
// });

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
