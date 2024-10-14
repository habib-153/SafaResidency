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
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Booking"],
    }),
    getMyBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/bookings/my-bookings",
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
