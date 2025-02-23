// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn } from "../auth/authSlice";
// import { setUser } from "../user/userSlice";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       headers.set("Content-Type", "application/json");
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     refreshToken: builder.query({
//       query: (data) => ({
//         url: "refresh",
//         method: "GET",
//         credentials: "include" as const,
//       }),
//     }),

//     loadUser: builder.query({
//       query: (data) => ({
//         url: "me",
//         method: "GET",
//         credentials: "include" as const,
//       }),

//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(
//             userLoggedIn({
//               accesstoken: result.data.accesstoken,
//               user: result.data.user,
//             })
//           );
//           dispatch(
//             setUser(result.data.user)
//           )
//         } catch (error: any) {
//           console.log(error);
//         }
//       },
//     }),
//   }),
// });

// export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";
import { setUser } from "../user/userSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  // Add tagTypes here
  tagTypes: ['Courses'], // Add any other tag types you might need in the future
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accesstoken: result.data.accesstoken,
              user: result.data.user,
            })
          );
          dispatch(
            setUser(result.data.user)
          )
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
