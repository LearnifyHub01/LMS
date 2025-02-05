// import { apiSlice } from "../api/apiSlice";

// export const userApi = apiSlice.injectEndpoints({
//     endpoints:(builder)=>({

        
//         updateAvatar:builder.mutation({
//             query:(avatar)=>({
//                 url : "update-user-avatar",
//                 method:"PUT",
//                 body:{avatar},
//                 credentials:"include" as const
//             })
//         }),
//         editProfile:builder.mutation({
//             query:({name})=>({
//                 url : "update-user-info",
//                 method:"PUT",
//                 body:{name},
//                 credentials:"include" as const
//             })
//         }),
//         updatePassword:builder.mutation({
//             query:({oldPassword,newPassword})=>({
//                 url : "update-user-password",
//                 method:"PUT",
//                 body:{oldPassword,newPassword},
//                 credentials:"include" as const
//             })
//         }),
//     })
// })
// export const {
//  useUpdateAvatarMutation,
//  useEditProfileMutation,
//  useUpdatePasswordMutation
// } = userApi;

import { apiSlice } from "../api/apiSlice";
import { updateUserName , setUpdateImage} from "../user/userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted({ avatar }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUpdateImage(avatar)); // ✅ Update Redux immediately
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      },
    }),

    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
      async onQueryStarted({ name }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateUserName(name)); // ✅ Update Redux immediately
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      },
    }),

    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
} = userApi;
