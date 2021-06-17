import { fastify } from 'fastify';
import { request } from 'http';

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

const server = fastify({ logger: true });

server.get<{ Querystring: IQuerystring; Headers: IHeaders }>(
  '/auth',
  {
    preValidation: (request, reply, done) => {
      const { username, password } = request.query;
      done(username !== 'admin' ? new Error('Must be admin') : undefined);
    },
  },
  async (request, reply) => {
    const customHeader = request.headers['h-Custom'];

    return `logged in!`;
  }
);

server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
