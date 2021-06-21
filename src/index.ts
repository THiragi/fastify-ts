import { fastify } from 'fastify';
import { router } from './routes';

const app = fastify({
  logger: true,
});

app.register(router);

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
