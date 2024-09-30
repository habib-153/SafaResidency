/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { imageUpload } from "../../utils/uploadImage";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/features/auth/authSlice";
import { useUpdateUserMutation } from "../../redux/features/auth/authApi";

const UpdateProfile = ({ user }) => {
const dispatch = useDispatch();
const [updateUser] = useUpdateUserMutation()

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const image = form.photo.files[0];

    const toastId = toast.loading("Updating Profile...");

    const image_url = await imageUpload(image);
    const userInfo = {
        _id: user._id,
        name: name, phone: phone, address: address, image: image_url
    }
    const result = await dispatch(updateUserProfile({ userInfo, updateUser }));

      if (result.type === "authSlice/updateUserProfile/fulfilled") {
        toast.success("update Successful", { id: toastId, duration: 2000 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
  };

  return (
    <div>
      <div className="flex flex-col w-full max-w-md py-4 space-y-2  bg-primary bg-opacity-45 dark:bg-gray-50 dark:text-gray-800 mx-auto text-black">
        <h1 className="text-3xl font-semibold text-center">
          Update your Profile
        </h1>

        <form
          noValidate=""
          action=""
          className="space-y-3"
          onSubmit={handleUpdate}
        >
          <div className="space-y-1 text-sm">
            <label
              htmlFor="username"
              className="block font-bold  dark:text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name" defaultValue={user?.name}
              placeholder="Name"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 border-2 border-gray-600 text-black"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="phone"
              className="block font-bold  dark:text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address" required defaultValue={user?.address}
              placeholder="Enter your address"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 border-2 border-gray-600 text-black"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="phone"
              className="block font-bold  dark:text-gray-600"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone" required defaultValue={user?.phone}
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 border-2 border-gray-600 text-black"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="photo"
              className="block dark:text-gray-600 font-bold "
            >
              Photo
            </label>
            <input
              type="file"
              name="photo"
              id="photo" 
              placeholder="photo"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 border-2 border-gray-600 text-black"
            />
            <div className="flex justify-end text-xs dark:text-gray-600"></div>
          </div>
          <div className="w-full text-center">
            <Button className="mt-3 btn" type="submit">
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;