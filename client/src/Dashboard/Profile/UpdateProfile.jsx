/* eslint-disable no-unused-vars */
import { Form, Input, Upload, Button } from 'antd';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { currentUser, updateUserProfile } from "../../redux/features/auth/authSlice";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { imageUpload } from "../../utils/uploadImage";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const [form] = Form.useForm();

  const user = useSelector(currentUser);
  const { data } = useGetSingleUserQuery(user?.email);
  const userData = data?.data;

  const handleUpdate = async (values) => {
    const toastId = toast.loading("Updating Profile...");

    try {
      const image = values.photo[0]?.originFileObj;

      const image_url = image ? await imageUpload(image) : userData?.image;

      const userInfo = {
        _id: userData?._id,
        name: values.name,
        phone: values.phone,
        address: values.address,
        image: image_url
      }
      
      const result = await dispatch(updateUserProfile({ userInfo, updateUser }));

      if (result.type === "authSlice/updateUserProfile/fulfilled") {
        toast.success("Update Successful", { id: toastId, duration: 2000 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("Error updating profile", { id: toastId, duration: 2000 });
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-br rounded-lg from-blue-50 to-purple-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-center">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <img
              src={userData?.image || "https://api.dicebear.com/7.x/avataaars/svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Update Profile</h1>
          <p className="text-blue-100">Customize your profile information</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
            initialValues={{
              name: userData?.name,
              phone: userData?.phone,
              address: userData?.address,
            }}
          >
            <Form.Item
              name="name"
              label={
                <span className="flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  <span>Full Name</span>
                </span>
              }
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input 
                size="large"
                placeholder="Enter your full name"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="address"
              label={
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>Address</span>
                </span>
              }
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input 
                size="large"
                placeholder="Enter your address"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={
                <span className="flex items-center gap-2">
                  <FaPhone className="text-blue-500" />
                  <span>Phone Number</span>
                </span>
              }
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input 
                size="large"
                placeholder="Enter your phone number"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="photo"
              label={
                <span className="flex items-center gap-2">
                  <AiOutlineCloudUpload className="text-blue-500" size={18} />
                  <span>Profile Photo</span>
                </span>
              }
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger
                name="photo"
                beforeUpload={() => false}
                maxCount={1}
                listType="picture"
                className="bg-blue-50 border-2 border-dashed border-blue-200 hover:border-blue-400"
              >
                <p className="text-4xl text-blue-500">
                  <AiOutlineCloudUpload className="mx-auto" />
                </p>
                <p className="text-gray-600">Click or drag file to upload</p>
                <p className="text-gray-400 text-sm">Support for a single image upload</p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item className="mb-0 mt-6">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 border-none hover:from-blue-600 hover:to-purple-600 rounded-lg font-medium text-lg"
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;