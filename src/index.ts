import fastify, { FastifyRequest, FastifyReply } from 'fastify';

const server = fastify({ logger: true });

server.get('/', async (_: FastifyRequest, reply: FastifyReply) => {
  reply.type('application/json').code(200);
  return { hello: 'world' };
});

server.listen(3000, (error: Error, address: string) => {
  if (error) throw error;
  server.log.info(`server listening on ${address}`);
});
