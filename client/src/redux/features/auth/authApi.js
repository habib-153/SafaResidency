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
    updateUser: builder.mutation({
      query: (userPayload) => {
        console.log(userPayload)
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
  }),
});

export const {useGetTokenMutation, useGetSingleUserQuery, useGetAllUsersQuery, useUpdateUserMutation} = authApi