import { apiSlice } from "./apiSlice";

export const returnReasonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReturnReasons: builder.query({
      query: () => ({
        url: "/return-reason",
      }),
      providesTags: ["ReturnReason"],
    }),
    createReturnReason: builder.mutation({
      query: (reasonData) => ({
        url: "/return-reason",
        method: "POST",
        body: reasonData,
      }),
      invalidatesTags: ["ReturnReason"],
    }),
    deleteReturnReason: builder.mutation({
      query: (returnReasonId) => ({
        url: `/return-reason/${returnReasonId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReturnReason"],
    }),
    updateReturnReason: builder.mutation({
      query: ({ reasonData, returnReasonId }) => ({
        url: `/return-reason/${returnReasonId}`,
        method: "PATCH",
        body: reasonData,
      }),
      invalidatesTags: ["ReturnReason"],
    }),
  }),
});

export const {
  useGetAllReturnReasonsQuery,
  useCreateReturnReasonMutation,
  useDeleteReturnReasonMutation,
  useUpdateReturnReasonMutation,
} = returnReasonApiSlice;
