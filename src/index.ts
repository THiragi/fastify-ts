import { fastify, FastifyRequest, FastifyReply } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

const server = fastify({ logger: true });

const User = Type.Object({
  name: Type.String(),
  mail: Type.Optional(Type.String({ format: 'email' })),
});

type UserType = Static<typeof User>;

const schema = {
  schema: {
    body: User,
    response: {
      200: User,
    },
  },
};

const handler = (req: FastifyRequest, rep: FastifyReply) => {
  const { body: user } = req;
  rep.status(200).send(user);
};

type PostType = {
  Body: UserType;
  Response: UserType;
};

server.post<PostType>('/', schema, handler);

server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
