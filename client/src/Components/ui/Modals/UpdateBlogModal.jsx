/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils/uploadImage";
import { useUpdateBlogMutation } from "../../../redux/features/blog/blogApi";
import { Modal } from "antd";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
    ["link", "image", "video"],
  ],
};

const UpdateBlogModal = ({ blog, isOpen, onClose }) => {
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updateBlog] = useUpdateBlogMutation();
  
    const methods = useForm({
      defaultValues: {
        title: "",
        description: "",
      },
    });
  
    // Reset form when blog changes
    useEffect(() => {
      if (blog) {
        methods.reset({
          title: blog.title,
          description: blog.description,
        });
        setTags(blog.category);
        setImagePreviews(blog.images);
        setImageFiles([]); // Reset image files
      }
    }, [blog, methods]);
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...files]);
  
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    };
  
    const removeImage = (index) => {
      const isNewImage = index >= blog.images.length;
      
      if (isNewImage) {
        const newImageIndex = index - blog.images.length;
        setImageFiles(prev => prev.filter((_, i) => i !== newImageIndex));
      }
      
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };
  
    const handleSubmit = async (data) => {
      setIsLoading(true);
      const toastId = toast.loading("Updating Blog...");
  
      try {
        // Upload new images
        const uploadPromises = imageFiles.map(file => imageUpload(file));
        const newImageUrls = await Promise.all(uploadPromises);
  
        // Combine existing and new images
        const existingImages = imagePreviews.filter(img => 
          blog.images.includes(img)
        );
  
        const payload = {
          title: data.title,
          description: data.description,
          category: tags,
          images: [...existingImages, ...newImageUrls].filter(Boolean)
        };
  
        const result = await updateBlog({
          id: blog._id,
          data: payload
        }).unwrap();
  
        if (result?.success) {
          toast.success("Blog Updated Successfully", { id: toastId });
          onClose();
        } else {
          throw new Error("Update failed");
        }
      } catch (error) {
        console.error("Update error:", error);
        toast.error(error?.data?.message || "Failed to update blog", {
          id: toastId
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Modal
        title="Update Blog"
        open={isOpen}
        onCancel={onClose}
        width={1000}
        footer={null}
        destroyOnClose
      >
        <Card className="w-full">
          <CardBody className="flex flex-col gap-6">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <div className="space-y-6">
                  {/* Title Input */}
                  <Input
                    {...methods.register("title", { required: true })}
                    label="Blog Title"
                    size="lg"
                    required
                  />
  
                  {/* Image Upload */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Typography variant="h6">Images</Typography>
                      <div className="relative">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleImageChange}
                          disabled={isLoading}
                        />
                        <Button variant="outlined" disabled={isLoading}>
                          Upload Images
                        </Button>
                      </div>
                    </div>
  
                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <div className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                                <img
                                  alt={`Project preview ${index + 1}`}
                                  className="h-full w-full object-cover object-center rounded-md"
                                  src={preview}
                                />
                                <button
                                  className="absolute bg-red-500 p-3 rounded-full font-bold -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeImage(index)}
                                >
                                  <BsTrash size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
  
                  {/* Tags */}
                  <div className="space-y-2">
                    <Typography variant="h6">Categories/Tags</Typography>
                    <Input
                      label="Add tags (comma separated)"
                      value={tags.join(", ")}
                      onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
                      required
                      disabled={isLoading}
                    />
                  </div>
  
                  {/* Description */}
                  <div className="h-[420px]">
                    <Controller
                      name="description"
                      control={methods.control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Typography variant="h6">Description</Typography>
                          <ReactQuill
                            {...field}
                            modules={quillModules}
                            className="h-72"
                            readOnly={isLoading}
                          />
                        </div>
                      )}
                    />
                  </div>
  
                  {/* Actions */}
                  <div className="flex justify-end gap-4">
                    <Button 
                      variant="outlined" 
                      onClick={onClose}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Blog"}
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </CardBody>
        </Card>
      </Modal>
    );
  };

export default UpdateBlogModal;
