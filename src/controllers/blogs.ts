import { FastifyRequest, FastifyReply } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

const Blog = Type.Object({
  id: Type.Number(),
  title: Type.String(),
});

type BlogType = Static<typeof Blog>;

const blogs: BlogType[] = [
  { id: 1, title: 'Is not everyone' },
  { id: 2, title: 'Fasty is pretty cool' },
  { id: 3, title: 'All I do I can still feel you' },
];

// handlers
const getAllBlogs = async () => blogs;

type BlogRequest = FastifyRequest<{ Body: BlogType; Params: BlogType }>;

const getBlog = async (
  request: FastifyRequest<{ Params: BlogType }>,
  _: FastifyReply
) => {
  const id: number = request.params.id;
  const blog = blogs.find((blog) => blog.id === id);

  return blog;
};

const addBlog = async (request: BlogRequest, _: FastifyReply) => {
  const id = blogs.length + 1;
  const { title } = request.body;
  const newBlog = { id, title };
  blogs.push(newBlog);

  return newBlog;
};

const updateBlog = async (request: BlogRequest, _: FastifyReply) => {
  const id = Number(request.params.id);
  const index = blogs.findIndex((blog) => blog.id === id);
  blogs.splice(index, 1, {
    id,
    title: request.body.title,
  });

  return {
    id,
    title: request.body.title,
  };
};

const deleteBlog = async (request: BlogRequest, _: FastifyReply) => {
  const id = Number(request.params.id);

  blogs.filter((blog) => blog.id !== id);
  return { msg: `Blog with ID ${id} is deleted` };
};

export { getAllBlogs, getBlog, addBlog, updateBlog, deleteBlog };
