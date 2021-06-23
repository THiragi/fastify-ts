import { RouteHandlerMethod } from 'fastify';
import { prisma } from '../helpers/utils';

export const getAllUsers: RouteHandlerMethod = async (_, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send({ data: users });
  } catch (err) {
    console.error('users', err);
    res.status(500).send({ error: 'Cannot fetch users' });
  }
};

export const getUser: RouteHandlerMethod = async (req, res) => {
  const { id } = req.params as { id: string }; // FIXME: just i don't like it
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.send({ data: user });
};
