import { fastify } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

const User = Type.Object({
  name: Type.String(),
  mail: Type.Optional(Type.String({ format: 'email' })),
});

type UserType = Static<typeof User>;

const server = fastify({ logger: true });

server.post<{ Body: UserType; Response: UserType }>(
  '/',
  {
    schema: {
      body: User,
      response: {
        200: User,
      },
    },
  },
  (req, rep) => {
    const { body: user } = req;
    rep.status(200).send(user);
  }
);

server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
