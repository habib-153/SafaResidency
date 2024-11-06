import { baseApi } from "../../api/baseApi";

const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGallery: builder.mutation({
      query: (data) => ({
        url: "/gallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
    getFullGallery: builder.query({
      query: () => {
        return {
          url: "/gallery",
          method: "GET",
        };
      },
      providesTags: ["Gallery"],
    }),
    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useCreateGalleryMutation,
  useGetFullGalleryQuery,
  useDeleteGalleryMutation
} = galleryApi;
