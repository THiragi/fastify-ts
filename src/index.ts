import fastify, { FastifyRequest, FastifyReply } from 'fastify';

const server = fastify({ logger: true });

server.get('/', async (req: FastifyRequest, res: FastifyReply) => {
  res.type('application/json').code(200);
  return { hello: 'world' };
});

server.listen(3000, (err: Error, add: string) => {
  if (err) throw err;
  server.log.info(`server listening on ${add}`);
});
