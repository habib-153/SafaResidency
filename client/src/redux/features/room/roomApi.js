import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (data) => ({
        url: "/room/create-room",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Room"],
    }),
    getAllRoom: builder.query({
      query: ({status, searchTerm, categories, sort, page }) => {
        const params = new URLSearchParams();
        if(status){
          params.append("status", status);
        }
        if(page){
          params.append("page", page);
        }
        if (searchTerm) {
          params.append("searchTerm", searchTerm.toString());
        }
        if (categories) {
          params.append("categories", categories);
        }
        if (sort) {
          params.append("sort", sort.sort);
        }
        return {
          url: "/room",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Room"],
    }),
    getSingleRoom: builder.query({
      query: (id) => {
        return {
          url: `/room/${id}`,
          method: "GET",
        };
      },
    }),
    updateRoom: builder.mutation({
      query: ({ payload, id }) => {
        console.log(payload, id)
        return {
          url: `/room/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Room"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/room/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomQuery,
  useGetSingleRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
