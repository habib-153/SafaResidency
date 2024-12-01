import { lazy } from 'react';

export const Error = lazy(() => import("../Pages/Error"));
export const Home = lazy(() => import("../Components/Home/Home"));
export const Login = lazy(() => import("../UserManagement/LogIn"));
export const SignUp = lazy(() => import("../UserManagement/SignUp"));
export const Accommodation = lazy(() => import("../Components/Accommodation/Accommodation"));
export const Gallery = lazy(() => import("../Components/Gallery/Gallery"));
export const Event = lazy(() => import("../Components/Events/Event"));
export const Profile = lazy(() => import("../Dashboard/Profile/Profile"));
export const Booking = lazy(() => import("../Components/Accommodation/Booking/Booking"));
export const ViewRates = lazy(() => import("../Components/Home/ViewRates/ViewRates")); 
export const MobileBookingNav = lazy(() => import("../Components/Home/MobileBooking/MobileBooking"));
export const ContactForm = lazy(() => import("../Components/Home/Contact/Contact"));
export const Blog = lazy(() => import("../Components/Blog/Blog"));
export const MembershipBenefits = lazy(() => import("../Components/Membership/Membership"));
export const TermsAndConditions = lazy(() => import("../Components/Terms/Terms"));