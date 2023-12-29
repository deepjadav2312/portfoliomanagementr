import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectXTechnologyApi = createApi({
  reducerPath: "projectXTechnologyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44363/api/v1/",
  }),
  tagTypes: ["ProjectXTechnologys"],
  endpoints: (builder) => ({
    getProjectXTechnologys: builder.query({
      query: () => ({
        url: "ProjectXTechnologyAPI/GetProjectXTechnologys",
      }),
      providesTags: ["ProjectXTechnologys"],
    }),

    getProjectXTechnologyById: builder.query({
      query: (id) => ({
        url: `ProjectXTechnologyAPI/GetProjectXTechnology/${id}`,
      }),
      providesTags: ["ProjectXTechnologys"],
    }),

    getProjectXTechnologyByProjectDetailsId: builder.query({
      query: (projectDetailsId) => ({
        url: `ProjectXTechnologyAPI/GetProjectXTechnologyByProjectDetailsId/${projectDetailsId}`,
      }),
      providesTags: ["ProjectXTechnologys"],
    }),

    createProjectXTechnology: builder.mutation({
      query: (data) => ({
        url: "ProjectXTechnologyAPI/CreateProjectXTechnology",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectXTechnologys"],
    }),

    updateProjectXTechnology: builder.mutation({
      query: ({ data, id }) => ({
        url: "ProjectXTechnologyAPI/UpdateProjectXTechnology/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProjectXTechnologys"],
    }),
    
    deleteProjectXTechnology: builder.mutation({
      query: (id) => ({
        url: "ProjectXTechnologyAPI/DeleteProjectXTechnology/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectXTechnologys"],
    }),
  }),
});

export const {
  useGetProjectXTechnologysQuery,
  useGetProjectXTechnologyByIdQuery,
  useCreateProjectXTechnologyMutation,
  useUpdateProjectXTechnologyMutation,
  useDeleteProjectXTechnologyMutation,
  useGetProjectXTechnologyByProjectDetailsIdQuery,
} = projectXTechnologyApi;
export default projectXTechnologyApi;
