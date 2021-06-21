import { RouteHandlerMethod } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPosts: RouteHandlerMethod = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
    });
    return res.send({ data: posts });
  } catch (err) {
    console.error('posts', err);
    res.status(500).send({ error: `Cannot fetch posts` });
  }
};
