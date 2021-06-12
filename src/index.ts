import fastify, { FastifyRequest, FastifyReply } from 'fastify';

const server = fastify({ logger: true });

server.get('/', async (req: FastifyRequest, res: FastifyReply) => {
  res.type('application/json').code(200);
  return { hello: 'world' };
});

server.listen(3000);
