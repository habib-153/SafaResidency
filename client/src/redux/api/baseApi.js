import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { verifyToken } from "../../utils/verifyToken";
import { logoutUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  //baseUrl: "http://localhost:5000/api",
  baseUrl: "https://safa-residency.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState, dispatch }) => {
    const token = (getState()).auth.token;
    const verified = verifyToken(token)
    
    if (token) {
      // Check if token is expired
      if (verified?.exp && verified.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
        // Redirect to login page
        window.location.href = '/login';
        return headers;
      }
      
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ['User', 'Room', 'Booking', 'Service', 'Blog', 'Gallery'],
});
