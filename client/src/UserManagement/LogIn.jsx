import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { loginUser, loginWithGoogle, resetPassword, toggleLoading } from "../redux/features/auth/authSlice";
import { useGetTokenMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const dispatch = useDispatch();
  const [getToken] = useGetTokenMutation()
  const loading = useSelector((state) => state.auth.loading);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const toastId = toast.loading("Log In...");
    try {
      dispatch(toggleLoading(true));
      const res = await dispatch(loginUser({email, password, getToken}))
      if(res?.type === "authSlice/loginUser/fulfilled"){
        toast.success("Log In Successful", { id: toastId, duration: 2000 });
        navigate(from);
      }else{
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
      dispatch(toggleLoading(false));
    } catch (err) {
      toast.error(err.message, { id: toastId, duration: 2000 });
    }
  };

  const handleResetPassword = async () => {
    if (!email) return toast.error("Please write your email first!");
    try {
      await dispatch(resetPassword(email)).unwrap();
      toast.success("Request Success! Check your email for further process...");
      dispatch(toggleLoading(false));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch(toggleLoading(false));
    }
    // console.log(email);
  };

  const handleGoogleLogin = async() => {
    const res = await dispatch(loginWithGoogle(getToken));
    if(res?.type === "authSlice/loginWithGoogle/fulfilled") {
      navigate(from);
      toast.success("Login Successful");
    }
  };

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                onBlur={(e) => setEmail(e.target.value)}
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
                autoComplete="current-password"
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
              className="btn w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button
            onClick={handleResetPassword}
            className="text-xs hover:underline hover:text-rose-500 text-gold"
          >
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        <button
          disabled={loading}
          onClick={handleGoogleLogin}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

        
        </button>

        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/sign-up"
            className="hover:underline hover:text-rose-500 text-gold"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
