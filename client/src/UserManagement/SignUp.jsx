import  { useState } from 'react';
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
// import { imageUpload } from "../utils/uploadImage";
import { FaArrowRight } from 'react-icons/fa6';
import { Modal } from 'antd';
import UpdateProfile from '../Dashboard/Profile/UpdateProfile';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getToken] = useGetTokenMutation();
  const loading = useSelector((state) => state.auth.loading);
  const [open, setOpen] = useState(true);





  const handleOpen = () => setOpen(!open);
  // Local state for form steps and data
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null
  });
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === 'phoneNumber') {
      // Allow only numbers and common phone number characters
      const sanitizedValue = value.replace(/[^\d+()-\s]/g, '');
      setFormData({ ...formData, [name]: sanitizedValue });
      setPhoneError('');
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear password error when user types in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const validatePhoneNumber = (phone) => {
    // Basic phone validation - at least 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };

  const validateFirstStep = () => {
    let isValid = true;
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('Please fill in both first and last name');
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    }

    return isValid;
  };

  const handleNextStep = () => {
    if (validateFirstStep()) {
      setStep(2);
    }
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }

    const toastId = toast.loading("Signing Up...");

    try {
      dispatch(toggleLoading(true));
      // const image_url = await imageUpload(formData.image);
      
      // Combine first and last name for the name field
      const name = `${formData.firstName} ${formData.lastName}`;
      
      const result = await dispatch(createUser({ 
        email: formData.email, 
        password: formData.password, 
        name, 
        phoneNumber: formData.phoneNumber,
        // image_url,
        getToken 
      }));

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

  const handleGoogleSignIn = async () => {
    const res = await dispatch(loginWithGoogle(getToken));
    if(res?.type === "authSlice/loginWithGoogle/fulfilled") {
      navigate('/dashboard');
      toast.success("Login Successful");
      // ekhane update kora lagbe, props deya lagbe na ,oita deya ahce direct component e
      return (
        <Modal
      open={open}
      onCancel={handleOpen}
      footer={null}
      className="rounded-lg"
      >
        
      
      <UpdateProfile />
    </Modal>
      )
      
    }
  };

  return (
    <div className="flex justify-center container max-w-2xl mx-auto items-center min-h-screen">
      <div className="flex flex-col max-w-md w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 my-3 border border-gold">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Safa Residency</p>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter Your First Name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter Your Last Name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Your Phone Number"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full flex items-center justify-center space-x-2 bg-rose-500 rounded-md py-3 text-black"
            >
              <span>Next</span>
              <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input
                  required
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div> */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-md border border-rose-500 text-rose-500"
              >
                Back
              </button>
              <button
                disabled={loading}
                type="submit"
                className="flex-1 bg-rose-500 rounded-md py-3 text-black"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        )}

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
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gold rounded-xl cursor-pointer"
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
        </p>
      </div>
    </div>
  );
};

export default SignUp;