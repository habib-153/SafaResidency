import express from 'express';
import auth from '../../middlewares/auth';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post('/', auth('admin'), BlogControllers.createBlog);
router.get('/', BlogControllers.getAllBlog);
router.get('/:id', BlogControllers.getSingleBlog);
router.put('/:id', auth('admin'), BlogControllers.updateBlog);
router.delete('/:id', auth('admin'), BlogControllers.deleteBlog);

export const BlogRoutes = router;