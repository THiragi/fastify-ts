import * as BlogController from '../controllers/blogs';
// import { Static, Type } from '@sinclair/typebox';
import { RouteOptions } from 'fastify';

const routes: RouteOptions[] = [
  {
    method: 'GET',
    url: '/api/blogs',
    handler: BlogController.getAllBlogs,
  },
  // {
  //   method: 'GET',
  //   url: '/api/blogs/:id',
  //   handler: BlogController.getBlog,
  // },
  // {
  //   method: 'POST',
  //   url: '/api/blogs',
  //   handler: BlogController.addBlog,
  // },
  // {
  //   method: 'PUT',
  //   url: '/api/blogs/:id',
  //   handler: BlogController.updateBlog,
  // },
  // {
  //   method: 'DELETE',
  //   url: '/api/blogs/:id',
  //   handler: BlogController.deleteBlog,
  // },
];

export default routes;
