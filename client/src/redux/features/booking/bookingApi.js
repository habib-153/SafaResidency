import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookRoom: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    getAllBookings: builder.query({
      query: () => {
        const params = new URLSearchParams();

        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Booking"],
    }),
    getMyBookings: builder.query({
      query: () => {
        return {
          url: "/my-bookings",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useBookRoomMutation,
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
} = roomApi;
