import { useState } from "react";
import { Button } from "@material-tailwind/react";
import AddGalleryModal from "./AddGalleryModal";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils/uploadImage";
import {
  useCreateGalleryMutation,
  useDeleteGalleryMutation,
  useGetFullGalleryQuery,
} from "../../../redux/features/gallery/galleryApi";
import Loading from "../../../Components/ui/Loading";
import { BsTrash } from "react-icons/bs";

const GalleryManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createGallery] = useCreateGalleryMutation();
  const { data, isLoading } = useGetFullGalleryQuery();
  const [deleteGallery] = useDeleteGalleryMutation();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddImage = async (values) => {
    const toastId = toast.loading("Uploading Image...");
    try {
      const imageUrl = await imageUpload(values.imageFile);
      if (imageUrl) {
        toast.loading("Adding Image to Gallery...", { id: toastId });

        const payload = {
          title: values.title,
          category: values.category,
          url: imageUrl,
        };

        const res = await createGallery(payload);
        if (res.error) {
          const errorMessage = res.error.data?.message || "Failed to add image";
          toast.error(errorMessage, {
            id: toastId,
            duration: 5000,
          });
        } else {
          toast.success("Image Added Successfully", {
            id: toastId,
            duration: 5000,
          });
        }
      } else {
        toast.error("Failed to upload image", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.error("Error uploading image:", error?.message);
      //   const errorMessage = error.response?.data?.error?.message || "Error uploading image. Please try again.";
      toast.error(error?.message, { id: toastId });
    } finally {
      handleCloseModal();
    }
  };

  const gallery = data?.data;

  const handleDeleteImage = async (Id) => {
    const toastId = toast.loading("Please wait...");
    const res = await deleteGallery(Id);
    //console.log(res);
    if (res?.error) {
      const errorMessage = res.error?.data?.message || "Failed to delete image";
      toast.error(errorMessage, {
        id: toastId,
        duration: 5000,
      });
    } else {
      toast.success("Image Deleted successfully", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="my-5 p-3">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Manage Gallery</h1>
        <p>Add Image, Remove Image from Gallery</p>
      </div>
      <div className="w-full text-right mb-4">
        <Button onClick={handleOpenModal} className="btn">
          Add Image
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gallery?.map((image) => (
          <div key={image?._id} className="relative group">
            <img
              src={image?.url}
              alt={image?.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
              <h3 className="text-white text-lg mb-2">{image?.title}</h3>
              <Button
                size="sm"
                variant="filled"
                className="bg-red-500 hover:bg-red-700 text-white"
                onClick={() => handleDeleteImage(image._id)}
              >
                <BsTrash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <AddGalleryModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleAddImage}
      />
    </div>
  );
};

export default GalleryManagement;
