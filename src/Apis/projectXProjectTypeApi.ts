import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectXProjectTypeApi = createApi({
  reducerPath: "projectXProjectTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44363/api/v1/",
  }),
  tagTypes: ["ProjectXProjectTypes"],
  endpoints: (builder) => ({
    getProjectXProjectTypes: builder.query({
      query: () => ({
        url: "ProjectXProjectTypeAPI/GetProjectXProjectTypes",
      }),
      providesTags: ["ProjectXProjectTypes"],
    }),

    getProjectXProjectTypeById: builder.query({
      query: (id) => ({
        url: `ProjectXProjectTypeAPI/GetProjectXProjectType/${id}`,
      }),
      providesTags: ["ProjectXProjectTypes"],
    }),

    getProjectXProjectTypeByProjectDetailsId: builder.query({
      query: (projectDetailsId) => ({
        url: `ProjectXProjectTypeAPI/GetProjectXProjectTypeByProjectDetailsId/${projectDetailsId}`,
      }),
      providesTags: ["ProjectXProjectTypes"],
    }),

    createProjectXProjectType: builder.mutation({
      query: (data) => ({
        url: "ProjectXProjectTypeAPI/CreateProjectXProjectType",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectXProjectTypes"],
    }),

    updateProjectXProjectType: builder.mutation({
      query: ({ data, id }) => ({
        url: "ProjectXProjectTypeAPI/UpdateProjectXProjectType/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProjectXProjectTypes"],
    }),

    deleteProjectXProjectType: builder.mutation({
      query: (id) => ({
        url: "ProjectXProjectTypeAPI/DeleteProjectXProjectType/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectXProjectTypes"],
    }),
  }),
});

export const {
  useGetProjectXProjectTypesQuery,
  useGetProjectXProjectTypeByIdQuery,
  useCreateProjectXProjectTypeMutation,
  useUpdateProjectXProjectTypeMutation,
  useDeleteProjectXProjectTypeMutation,
  useGetProjectXProjectTypeByProjectDetailsIdQuery,
} = projectXProjectTypeApi;
export default projectXProjectTypeApi;
