import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: 'create-course',
        method: 'POST',
        body: data, // Pass data directly instead of wrapping it inside an object
        credentials: 'include' as const,
      }),
    }),

    getAllCourses: builder.query({
      query:() => ({
        url:"get-courses",
        method: 'GET',
        credentials: 'include' as const,

      })
    })
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery } = courseApi;
