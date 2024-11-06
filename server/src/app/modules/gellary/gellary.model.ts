import { model, Schema } from "mongoose";
import { TGallery } from "./gellary.interface";

const gallerySchema = new Schema<TGallery>(
    {
      category: { type: String, required: true },
      url: { type: String, required: true },
      title: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  export const Gallery = model<TGallery>('Gallery', gallerySchema);