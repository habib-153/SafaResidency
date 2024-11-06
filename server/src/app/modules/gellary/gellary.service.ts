import { TGallery } from './gellary.interface';
import { Gallery } from './gellary.model';

const postAnImage = async (payload: TGallery) => {
  const newImage = await Gallery.create(payload);
  return newImage;
};

const getFullGallery = async () => {
  const gallery = await Gallery.find();
  return gallery;
};

const deleteImage = async (id: string) => {
  const result = await Gallery.findByIdAndDelete(id);
  return result;
};

export const GalleryService = {
  postAnImage,
  getFullGallery,
  deleteImage,
};
