import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    images: { type: [String], required: true },
    category: { type: [String], required: true },
},
{
    timestamps: true,
})

export const Blog = model<TBlog>('Blog', blogSchema)