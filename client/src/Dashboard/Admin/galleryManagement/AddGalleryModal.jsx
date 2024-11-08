/* eslint-disable react/prop-types */
import { Input, Option, Select } from "@material-tailwind/react";
import { Modal, Form, Button,  Typography } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";



const AddGalleryModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFinish = (values) => {
    onSubmit({ ...values, imageFile });
    form.resetFields();
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file) {
      if (file.size > maxSize) {
        toast.error(
          `File size too large. Maximum is ${maxSize / (1024 * 1024)}MB.`
        );
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Modal
      title="Add New Image"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="title"
         
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input  label="Title"/>
        </Form.Item>
        <Form.Item
          name="category"
          
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select label="Category" placeholder="Select a category">
            <Option value="room">Room</Option>
            <Option value="hotel">Hotel</Option>
            <Option value="dining">Dining</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <div className="space-y-4">
            <Typography variant="h6">Upload Image</Typography>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleImageChange}
              />
              <Button
                className="flex items-center gap-2 relative pointer-events-none w-full"
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
                Upload Image
              </Button>
            </div>
            {imagePreview && (
              <div className="relative group">
                <div className="relative h-48 w-48 rounded-xl border-2 border-dashed border-blue-gray-200 p-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover object-center rounded-lg"
                  />
                  <Button
                    size="sm"
                    variant="filled"
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={removeImage}
                  >
                    <BsTrash className="h-4 w-4 mx-auto" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button className="btn" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGalleryModal;
