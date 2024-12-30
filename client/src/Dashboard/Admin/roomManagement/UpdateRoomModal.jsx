/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Input, Select, Switch, Divider } from "antd";
import { useUpdateRoomMutation } from "../../../redux/features/room/roomApi";
import { imageUpload } from "../../../utils/uploadImage";
import toast from "react-hot-toast";
import { roomCategoryOptions } from "../../../utils/constant";

export const UpdateRoomModal = ({ isOpen, onClose, roomData }) => {
  const [updateRoom] = useUpdateRoomMutation();
  const [formData, setFormData] = useState({});
  const [imageFiles, setImageFiles] = useState([null, null, null]);

  useEffect(() => {
    if (roomData) {
      setFormData(roomData);
    }
  }, [roomData]);

  const handleFileChange = (index, file) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = file;
    setImageFiles(newImageFiles);
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating room...");
    try {
      let updatedFormData = { ...formData };
      const currentImageCount = formData.images?.length || 0;
      const newImageCount = imageFiles.filter((file) => file !== null).length;

      if (currentImageCount + newImageCount > 3) {
        toast.error("Maximum 3 images allowed", { id: toastId });
        return;
      }

      if (imageFiles.some((file) => file !== null)) {
        const imageUrls = await Promise.all(
          imageFiles.map(async (file) => {
            if (file) {
              return await imageUpload(file);
            }
            return null;
          })
        );
        const filteredNewImages = imageUrls.filter((url) => url !== null);
        updatedFormData.images = [
          ...(formData.images || []),
          ...filteredNewImages,
        ];
      }

      const res = await updateRoom({
        id: roomData._id,
        payload: updatedFormData,
      });

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Room updated successfully", { id: toastId });
        onClose();
      }
    } catch (error) {
      toast.error("Failed to update room", { id: toastId });
    }
  };

  return (
    <Modal
      title={<h2 className="text-2xl font-bold">Update Room Details</h2>}
      open={isOpen}
      onCancel={onClose}
      onOk={handleUpdate}
      width={800}
      className="max-h-[80vh]"
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Room Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Room Number</label>
              <Input
                value={formData?.room_overview?.room_number}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    room_overview: {
                      ...prev.room_overview,
                      room_number: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div>
              <label className="block mb-1">Category</label>
              <Select
                value={formData?.category}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }
                style={{ width: "100%" }}
                options={roomCategoryOptions}
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1">Room Name</label>
              <Input
                value={formData?.room_overview?.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    room_overview: {
                      ...prev.room_overview,
                      name: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1">Description</label>
              <Input.TextArea
                value={formData?.room_overview?.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    room_overview: {
                      ...prev.room_overview,
                      description: e.target.value,
                    },
                  }))
                }
                rows={3}
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* Bed and Bedding */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Bed and Bedding</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Maximum Adults</label>
              <Input
                type="number"
                value={formData?.beds_and_bedding?.maximum_adults}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    beds_and_bedding: {
                      ...prev.beds_and_bedding,
                      maximum_adults: Number(e.target.value),
                    },
                  }))
                }
              />
            </div>
            <div>
              <label className="block mb-1">Maximum Children</label>
              <Input
                type="number"
                value={formData?.beds_and_bedding?.maximum_children}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    beds_and_bedding: {
                      ...prev.beds_and_bedding,
                      maximum_children: Number(e.target.value),
                    },
                  }))
                }
              />
            </div>
            <div>
              <label className="block mb-1">Beds</label>
              <Input
                value={formData?.beds_and_bedding?.beds}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    beds_and_bedding: {
                      ...prev.beds_and_bedding,
                      beds: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* Room Features */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Room Features</h3>
          <div className="grid grid-cols-2 gap-4">
            <Switch
              checked={formData?.room_features?.air_conditioned}
              onChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  room_features: {
                    ...prev.room_features,
                    air_conditioned: checked,
                  },
                }))
              }
              checkedChildren="Air Conditioned"
              unCheckedChildren="No AC"
            />
            <Switch
              checked={formData?.room_features?.non_smoking}
              onChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  room_features: {
                    ...prev.room_features,
                    non_smoking: checked,
                  },
                }))
              }
              checkedChildren="Non-Smoking"
              unCheckedChildren="Smoking"
            />
          </div>
        </section>

        <Divider />

        {/* Bath and Bathroom Features */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Bathroom Features</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData?.bath_and_bathroom_features || {})
              .map(
                (key) =>
                  key !== "_id" && ( // Skip the id field
                    <Switch
                      key={key}
                      checked={formData?.bath_and_bathroom_features[key]}
                      onChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          bath_and_bathroom_features: {
                            ...prev.bath_and_bathroom_features,
                            [key]: checked,
                          },
                        }))
                      }
                      checkedChildren={key.split("_").join(" ")}
                      unCheckedChildren={key.split("_").join(" ")}
                    />
                  )
              )
              .filter(Boolean)}{" "}
            {/* Filter out undefined values from skipped id */}
          </div>
        </section>

        <Divider />

        {/* Furniture and Furnishings */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Furniture</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData?.furniture_and_furnishings || {})
              .map(
                (key) =>
                  key !== "_id" && ( // Skip the id field
                    <Switch
                      key={key}
                      checked={formData?.furniture_and_furnishings[key]}
                      onChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          furniture_and_furnishings: {
                            ...prev.furniture_and_furnishings,
                            [key]: checked,
                          },
                        }))
                      }
                      checkedChildren={key.split("_").join(" ")}
                      unCheckedChildren={key.split("_").join(" ")}
                    />
                  )
              )
              .filter(Boolean)}{" "}
            {/* Filter out undefined values from skipped id */}
          </div>
        </section>

        <Divider />

        {/* Price and Status */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Price and Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Price per Night</label>
              <Input
                type="number"
                value={formData?.price}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                prefix="$"
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* Images */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Room Images</h3>
          <div className="space-y-4">
            {/* Existing Images */}
            <div className="grid grid-cols-3 gap-4">
              {formData?.images?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Room ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* New Images */}
            {(formData?.images?.length || 0) < 3 && (
              <div className="space-y-2">
                <label className="block mb-1">
                  Add New Images ({3 - (formData?.images?.length || 0)} slots
                  remaining)
                </label>
                {Array(3 - (formData?.images?.length || 0))
                  .fill(null)
                  .map((_, index) => (
                    <Input
                      key={index}
                      type="file"
                      onChange={(e) =>
                        handleFileChange(index, e.target.files[0])
                      }
                      accept="image/*"
                      className="mb-2"
                    />
                  ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Modal>
  );
};
