import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (userInfo) => ({
        url: '/auth',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getAllUsers: builder.query({
      query:(args) =>{
        const params = new URLSearchParams()

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return{
          url:'/users',
          method:'GET',
          params: params
        }
      },
      providesTags:['User']
    }),
    getAdminStats: builder.query({
      query:() =>{
        return{
          url:'/admin',
          method:'GET',
        }
      },
      providesTags:['User', 'Booking', 'Room', "Service"]
    }),
    updateUser: builder.mutation({
      query: (userPayload) => {

        return {
          url: `/users/${userPayload.id}`,
          method: "PUT",
          body: userPayload.payload,
        };
      },
      invalidatesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (email) => {
        return {
          url: `/users/${email}`,
          method: "GET"
        };
      },
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
})

export const {useGetTokenMutation, useGetAdminStatsQuery, useGetSingleUserQuery, useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation} = authApi