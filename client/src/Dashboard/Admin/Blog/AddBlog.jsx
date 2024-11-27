import { useState } from "react";
import {
  Card,
  CardHeader,
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
import { useCreateBlogMutation } from "../../../redux/features/blog/blogApi";

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

const AddBlog = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [addBlog] = useCreateBlogMutation();

  const methods = useForm();

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);

      setImageFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data) => {
    const toastId = toast.loading("Uploading Images...");
    try {
      const imageUrls = await Promise.all(
        imageFiles.map((file) => (file ? imageUpload(file) : null))
      );

      if (imageUrls) {
        toast.loading("Adding Blog Into Database...", { id: toastId });

        const filteredImageUrls = imageUrls.filter((url) => url !== null);

        const payload = {
          title: data.title,
          description: data.description,
          category: tags,
          images: filteredImageUrls,
        };

        const res = await addBlog(payload);
        // console.log(res);
        if (res.error) {
          toast.error(res?.error?.data?.message, {
            id: toastId,
            duration: 5000,
          });
        } else {
          toast.success("Blog Added Successfully", {
            id: toastId,
            duration: 5000,
          });
        }
      } else {
        toast.error("Failed to upload images", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="container mx-auto px-2 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="mb-4 grid h-16 place-items-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-bold text-black ">
            Add New Blog
          </h1>
        </CardHeader>

        <CardBody className="flex flex-col p-2 lg:px-4 gap-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <Input
                    {...methods.register("title", { required: true })}
                    label="Blog Title"
                    size="lg"
                    required
                  />
                </div>
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Typography variant="h6">Images</Typography>
                    <div className="relative">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleImageChange}
                        required
                      />
                      <Button
                        className="flex items-center gap-2 relative pointer-events-none"
                        variant="outlined"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Upload Images
                      </Button>
                    </div>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="relative h-48 w-48 rounded-xl border-2 border-dashed border-blue-gray-200 p-2">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="h-full w-full object-cover object-center rounded-lg"
                            />
                            <Button
                              size="sm"
                              variant="filled"
                              className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                              onClick={() => removeImage(index)}
                            >
                              <BsTrash className="h-4 w-4 mx-auto" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Tags Section */}
                <div className="space-y-1">
                  <Typography variant="h6">Categories/Tags</Typography>
                  <Input
                    label="Add Comma(,) after each tag"
                    size="lg"
                    onChange={(e) =>
                      setTags(
                        e.target.value.split(",").map((tag) => tag.trim())
                      )
                    }
                    required
                  />
                </div>

                {/* Description Section */}
                <div className="h-[420px]">
                  <Controller
                    control={methods.control}
                    name="description"
                    rules={{ required: "Please provide post description" }}
                    render={({ field }) => (
                      <div className="w-full space-y-3">
                        <Typography variant="h6">Blog Description</Typography>
                        <ReactQuill
                          {...field}
                          className="sm:h-72 h-48"
                          modules={quillModules}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="w-full text-center">
                <Button
                  type="submit"
                  variant="gradient"
                  color="black"
                  className="w-fit "
                  onClick={methods.handleSubmit(handleSubmit)}
                >
                  Add Blog
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddBlog;
