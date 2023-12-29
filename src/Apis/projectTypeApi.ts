import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectTypeApi = createApi({
  reducerPath: "projectTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44363/api/v1/",
  }),
  tagTypes: ["ProjectTypes"],
  endpoints: (builder) => ({
    getAllProjectTypes: builder.query({
      query: () => ({
        url: "ProjectTypeAPI/GetProjectTypes",
        method: "GET",
      }),
      providesTags: ["ProjectTypes"],
    }),
    getProjectTypes: builder.query({
      query: ({ search, pageSize, pageNumber }) => ({
        url: "ProjectTypeAPI/GetProjectTypes",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["ProjectTypes"],
    }),

    getProjectTypeById: builder.query({
      query: (id) => ({
        url: `ProjectTypeAPI/GetProjectType/${id}`,
      }),
      providesTags: ["ProjectTypes"],
    }),

  
    createProjectType: builder.mutation({
      query: (data) => ({
        url: "ProjectTypeAPI/CreateProjectType",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectTypes"],
    }),

    updateProjectType: builder.mutation({
      query: ({ data, id }) => ({
        url: "ProjectTypeAPI/UpdateProjectType/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProjectTypes"],
    }),
    
    deleteProjectType: builder.mutation({
      query: (id) => ({
        url: "ProjectTypeAPI/DeleteProjectType/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectTypes"],
    }),
  }),
});

export const {
  useGetProjectTypesQuery,
  useGetAllProjectTypesQuery,
  useGetProjectTypeByIdQuery,
  useCreateProjectTypeMutation,
  useUpdateProjectTypeMutation,
  useDeleteProjectTypeMutation,
} = projectTypeApi;
export default projectTypeApi;
