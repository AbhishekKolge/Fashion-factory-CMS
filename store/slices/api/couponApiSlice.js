import { apiSlice } from "./apiSlice";

export const couponApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: (queries) => {
        let queryString = "";
        for (const key in queries) {
          if (queries[key]) {
            queryString = `${queryString}${queryString ? "&" : "?"}${key}=${
              queries[key]
            }`;
          }
        }

        return {
          url: `/coupon${queryString}`,
        };
      },
      providesTags: ["Coupon"],
    }),
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/coupon",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `/coupon/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
    updateCoupon: builder.mutation({
      query: ({ couponData, couponId }) => ({
        url: `/coupon/${couponId}`,
        method: "PATCH",
        body: couponData,
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} = couponApiSlice;
