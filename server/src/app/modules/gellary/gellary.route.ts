import express from 'express';
import auth from '../../middlewares/auth';
import { GalleryController } from './gellary.controller';

const router = express.Router();

router.post('/', auth('admin'), GalleryController.postAnImage);
router.get('/', GalleryController.getFullGallery);
router.delete('/:id', auth('admin'), GalleryController.deleteImage);

export const GalleryRoutes = router;