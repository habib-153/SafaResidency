import { useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button, Input } from '@material-tailwind/react';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getToken] = useGetTokenMutation();
  const loading = useSelector((state) => state.auth.loading);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear password error when user types in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handlePhoneNumberChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('Please enter your full name');
      isValid = false;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      isValid = false;
    }

    if (!validatePassword(formData.password)) {
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    
    const toastId = toast.loading("Signing Up...");

    try {
      dispatch(toggleLoading(true));
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      }
// console.log(payload)
      const result = await dispatch(createUser({ 
        payload,
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
    if (res?.type === "authSlice/loginWithGoogle/fulfilled") {
      navigate(`/${res?.payload?.user?.role}/dashboard`, { state: { showProfilePromptModal: true } });
      toast.success("Login Successful");
    }
  };

  return (
    <div className="flex justify-center container max-w-2xl mx-auto items-center min-h-screen">
      <div className="flex flex-col max-w-md w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 my-3 border border-gold">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">{t("auth.signup.title")}</h1>
          <p className="text-sm text-gray-400">{t("auth.signup.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
             
              <Input
                type="text"
                name="firstName"
                label='First Name'
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="Enter your first name"
              />
            </div>
            <div>
              
              <Input
                type="text"
                name="lastName"
                label='Last Name'
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Enter your last name"
              />
            </div>
            <div>
              
              <Input
                type="email"
                name="email"
                label='Email'
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div>
            
              <PhoneInput
                country={'bd'}
                value={formData.phoneNumber}
                label="Phone Number"
                onChange={handlePhoneNumberChange}
                inputClass="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              
              <Input
                type="password"
                name="password"
                label='Password'
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <div>
           
              <Input
                type="password"
                name="confirmPassword"
                label='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gold hover:bg-black hover:text-white transition-colors duration-500"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin" />
              ) : (
                'Sign Up'
              )}
            </Button>
          </div>
        </form>
         
        <p className="px-6 text-sm text-center text-gray-400">
          {t("auth.signup.haveAccount")}{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gold"
          >
            {t("auth.signup.login")}
          </Link>
        </p>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-400">Or sign up with</p>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <Button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="mt-4 w-full flex justify-center items-center space-x-2 border bg-white rounded-md cursor-pointer hover:bg-gold hover:text-white transition-colors duration-500"
        >
          <FcGoogle size={32} />
          
        </Button>
      </div>
    </div>
  );
};

export default SignUp;