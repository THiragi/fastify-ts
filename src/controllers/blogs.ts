import { RouteHandlerMethod } from 'fastify';
import { prisma } from '../helpers/utils';

export const getAllPosts: RouteHandlerMethod = async (_, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
    });
    res.send({ data: posts });
  } catch (err) {
    console.error('posts', err);
    res.status(500).send({ error: `Cannot fetch posts` });
  }
};
