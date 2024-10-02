import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useGetTokenMutation } from "../redux/features/auth/authApi";
import {
  createUser,
  loginWithGoogle,
  toggleLoading,
} from "../redux/features/auth/authSlice";
import { imageUpload } from "../utils/uploadImage";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getToken] = useGetTokenMutation();
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    const toastId = toast.loading("Signing Up...");

    try {
      dispatch(toggleLoading(true));
      const image_url = await imageUpload(image);
      const result = await dispatch(createUser({ email, password, name, image_url, getToken }));

      if (result.type === "authSlice/createUser/fulfilled") {
        toast.success("Signup Successful", { id: toastId, duration: 2000 });
        navigate('/');
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      toast.error(err.message, { id: toastId, duration: 2000 });
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    const res = await dispatch(loginWithGoogle(getToken));
    if(res?.type === "authSlice/loginWithGoogle/fulfilled") {
      navigate('/');
      toast.success("Login Successful");
    }
  };

  return (
    <div className="flex justify-center container max-w-2xl mx-auto items-center min-h-screen">
      <div className="flex flex-col max-w-md w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 my-3 border border-gold ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Safa Residency</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 btn text-black "
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Sign up with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gold  rounded-xl cursor-pointer"
        >
          <FcGoogle size={32} />

          
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gold"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
