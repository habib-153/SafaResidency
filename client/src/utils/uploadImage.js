import axios from "axios";
import toast from "react-hot-toast";

export const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.secure_url;
    } catch (err) {
      toast.error("Error uploading image");
      throw new Error("Error uploading image to Cloudinary");
    }
  };