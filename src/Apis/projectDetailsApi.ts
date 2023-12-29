import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectDetailsApi = createApi({
  reducerPath: "projectDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44363/api/v1/",
  }),
  tagTypes: ["ProjectDetailss"],
  endpoints: (builder) => ({
    getProjectDetailss: builder.query({
      query: ({search, pageSize, pageNumber}) => ({
        url: `ProjectDetailsAPI/GetProjectDetailss/?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),
      providesTags: ["ProjectDetailss"],
    }),
    getAllProjectDetailss: builder.query({
      query: () => ({
        url: `ProjectDetailsAPI/GetProjectDetailss`,
      }),
      providesTags: ["ProjectDetailss"],
    }),

    getProjectDetailsById: builder.query({
      query: (id) => ({
        url: `ProjectDetailsAPI/GetProjectDetails/${id}`,
      }),
      providesTags: ["ProjectDetailss"],
    }),

    getProjectDetailsByLazyLoading: builder.query({
      query: (pageNum) => ({
        url: `ProjectDetailsAPI/ProjectDetailsByLazyLoading/${pageNum}`,
      }),
      providesTags: ["ProjectDetailss"],
    }),

  
    createProjectDetails: builder.mutation({
      query: (data) => ({
        url: "ProjectDetailsAPI/CreateProjectDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectDetailss"],
    }),

    updateProjectDetails: builder.mutation({
      query: ({ data, id }) => ({
        url: "ProjectDetailsAPI/UpdateProjectDetails/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProjectDetailss"],
    }),
    
    deleteProjectDetails: builder.mutation({
      query: (id) => ({
        url: "ProjectDetailsAPI/DeleteProjectDetails/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectDetailss"],
    }),
  }),
});

export const {
  useGetProjectDetailssQuery,
  useGetAllProjectDetailssQuery,
  useGetProjectDetailsByIdQuery,
  useGetProjectDetailsByLazyLoadingQuery,
  useCreateProjectDetailsMutation,
  useUpdateProjectDetailsMutation,
  useDeleteProjectDetailsMutation,
} = projectDetailsApi;
export default projectDetailsApi;
