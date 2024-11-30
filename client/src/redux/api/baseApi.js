import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  //baseUrl: "https://safa-residency.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState()).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ['User', 'Room', 'Booking', 'Service', 'Blog', 'Gallery', 'Event'],
});
