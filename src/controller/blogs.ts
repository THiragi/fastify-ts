import { FastifyRequest, FastifyReply } from 'fastify';

type Post = {
  id: number;
  title: string;
};

const blogs: Post[] = [
  { id: 1, title: 'Is not everyone' },
  { id: 2, title: 'Fasty is pretty cool' },
  { id: 3, title: 'All I do I can still feel you' },
];

// handlers
const getAllBlogs = async () => blogs;

type BlogRequest = FastifyRequest<{ Body: Post; Params: Post }>;

const getBlog = async (request: BlogRequest, _: FastifyReply) => {
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

export { Post, getAllBlogs, getBlog, addBlog };
