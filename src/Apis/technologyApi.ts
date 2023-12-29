import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const technologyApi = createApi({
  reducerPath: "technologyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44363/api/v1/",
  }),
  tagTypes: ["Technologys"],
  endpoints: (builder) => ({
    getAllTechnologys: builder.query({
      query: () => ({
        url: "TechnologyAPI/GetTechnologys",
        method: "GET",
      }),
      providesTags: ["Technologys"],
    }),
    
    getTechnologys: builder.query({
      query: ({ search, pageSize, pageNumber }) => ({
        url: "TechnologyAPI/GetTechnologys",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["Technologys"],
    }),
    
    getTechnologyById: builder.query({
      query: (id) => ({
        url: `TechnologyAPI/GetTechnology/${id}`,
      }),
      providesTags: ["Technologys"],
    }),
    createTechnology: builder.mutation({
      query: (data) => ({
        url: "TechnologyAPI/CreateTechnology",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Technologys"],
    }),
    updateTechnology: builder.mutation({
      query: ({ data, id }) => ({
        url: "TechnologyAPI/UpdateTechnology/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Technologys"],
    }),
    deleteTechnology: builder.mutation({
      query: (id) => ({
        url: "TechnologyAPI/DeleteTechnology/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Technologys"],
    }),
  }),
});

export const {
  useGetTechnologysQuery,
  useGetAllTechnologysQuery,
  useGetTechnologyByIdQuery,
  useCreateTechnologyMutation,
  useUpdateTechnologyMutation,
  useDeleteTechnologyMutation,
} = technologyApi;

export default technologyApi;
