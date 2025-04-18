// import { apiSlice } from "../api/apiSlice";

// export const courseApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createCourse: builder.mutation({
//       query: (data) => ({
//         url: "create-course",
//         method: "POST",
//         body: data,
//         credentials: "include" as const,
//       }),
//     }),

//     getAllCourses: builder.query({
//       query: () => ({
//         url: "get-all-courses",
//         method: "GET",
//         credentials: "include" as const,
//       }),
//     }),

//     deleteCourse: builder.mutation({
//       query: (courseId) => ({
//         url: `delete-course/${courseId}`,
//         method: "DELETE",
//         credentials: "include" as const,
//       }),
//     }),

//     editCourse: builder.mutation({
//       query: ({ courseId, data }) => ({
//         url: `edit-course/${courseId}`,
//         method: "PUT",
//         body: data,
//         credentials: "include" as const,
//       }),
//     }),

//     getUsersAllCourses: builder.query({
//       query: () => ({
//         url: `get-courses`,
//         method: "GET",
//         credentials: "include" as const,
//       }),
//     }),

//     getCourseDetails: builder.query({
//       query: (id) => ({
//         url: `get-course/${id}`,
//         method: "GET",
//         credentials: "include" as const,
//       }),
//     }),

//     getCourseContent: builder.query({
//       query: (id) => ({
//         url: `get-courses-content/${id}`,
//         method: "GET",
//         credentials: "include" as const,
//       }),
//     }),

//     addNewQuestion: builder.mutation({
//       query: ({ question, courseId, contentId }) => ({
//         url: "add-question",
//         body: {
//           question,
//           courseId,
//           contentId,
//         },
//         method: "PUT",
//         credentials: "include" as const,
//       }),
//     }),

//     addAnswerInQuestion: builder.mutation({
//       query: ({ answer, courseId, contentId, questionId }) => ({
//         url: "add-answer",
//         body: {
//           answer,
//           courseId,
//           contentId,
//           questionId,
//         },
//         method: "PUT",
//         credentials: "include" as const,
//       }),
//     }),

//     addReviewInCourse: builder.mutation({
//       query: ({ review, rating, courseId }: any) => ({
//         url: `add-review/${courseId}`,
//         body: {
//           review,
//           rating,
//         },
//         method:"PUT",
//         credentials: "include" as const,
//       }),
//     }),

//     searchCourses: builder.query({
//       query: (title) => ({
//         url: `search-courses?title=${encodeURIComponent(title)}`,
//         method: "GET",
//         credentials: "include" as const,
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateCourseMutation,
//   useGetAllCoursesQuery,
//   useDeleteCourseMutation,
//   useEditCourseMutation,
//   useGetCourseDetailsQuery,
//   useGetCourseContentQuery,
//   useAddNewQuestionMutation,
//   useAddAnswerInQuestionMutation,
//   useAddReviewInCourseMutation,
//   useSearchCoursesQuery
// } = courseApi;
import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: "get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    searchCourses: builder.query({
      query: (title) => ({
        url: `search-courses?title=${encodeURIComponent(title)}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `delete-course/${courseId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    editCourse: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `edit-course/${courseId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getUsersAllCourses: builder.query({
      query: () => ({
        url: `get-all-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getUsersCourses: builder.query({
      query: () => ({
        url: `get-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-courses-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "add-question",
        body: {
          question,
          courseId,
          contentId,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),

    addAnswerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "add-answer",
        body: {
          answer,
          courseId,
          contentId,
          questionId,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),

    addReviewInCourse: builder.mutation({
      query: ({  review, rating, courseId }: any) => ({
        url: `add-review/${courseId}`,
        body: {
          review,
          rating,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetUsersCoursesQuery,
  useSearchCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
} = courseApi;

