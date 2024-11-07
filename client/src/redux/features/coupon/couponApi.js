import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    getAllCoupons: builder.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),
    getCouponByCode: builder.query({
      query: (code) => ({
        url: `/coupons/${code}`,
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useGetCouponByCodeQuery,
  useDeleteCouponMutation,
  useLazyGetCouponByCodeQuery
} = couponApi;