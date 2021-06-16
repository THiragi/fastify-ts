import { createServer, IncomingMessage, ServerResponse } from 'http';

const port = 5000;

const server = createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.write('Hello, TypeScript!');
    res.end();
  }
);

server.listen(port);
