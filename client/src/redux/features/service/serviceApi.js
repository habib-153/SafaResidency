import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    getAllServices: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/services",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Service"],
    }),
    getMyServices: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/services/my-services",
          method: "GET",
        };
      },
    }),
    updateService: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/services"/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services"/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useBookServiceMutation,
    useGetAllServicesQuery,
    // useGetMyServicesQuery,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = serviceApi;
