import {
  RouteHandlerMethod,
  // RawServerDefault,
  // RawRequestDefaultExpression,
  // RawReplyDefaultExpression,
} from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// type RequestHandler<Request> = RouteHandlerMethod<
//   RawServerDefault,
//   RawRequestDefaultExpression<RawServerDefault>,
//   RawReplyDefaultExpression<RawServerDefault>,
//   Request
// >;

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

export const getAllUsers: RouteHandlerMethod = async (_, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send({ data: users });
  } catch (err) {
    console.error('users', err);
    res.status(500).send({ error: 'Cannot fetch users' });
  }
};

// export const getUser: RequestHandler<{ Params: { id?: string } }> = async (
//   req,
//   res
// ) => {
//   const { id } = req.params;
//   const user = await prisma.user.findUnique({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.send({ data: user });
// };
