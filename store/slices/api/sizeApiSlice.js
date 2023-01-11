import { apiSlice } from "./apiSlice";

export const sizeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSizes: builder.query({
      query: () => ({
        url: "/size",
      }),
      providesTags: ["Size"],
    }),
    createSize: builder.mutation({
      query: (sizeData) => ({
        url: "/size",
        method: "POST",
        body: sizeData,
      }),
      invalidatesTags: ["Size"],
    }),
    deleteSize: builder.mutation({
      query: (sizeId) => ({
        url: `/size/${sizeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Size"],
    }),
    updateSize: builder.mutation({
      query: ({ sizeData, sizeId }) => ({
        url: `/size/${sizeId}`,
        method: "PATCH",
        body: sizeData,
      }),
      invalidatesTags: ["Size"],
    }),
  }),
});

export const {
  useGetAllSizesQuery,
  useCreateSizeMutation,
  useDeleteSizeMutation,
  useUpdateSizeMutation,
} = sizeApiSlice;
