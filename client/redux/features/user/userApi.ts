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

// import { apiSlice } from "../api/apiSlice";
// import { updateUserName , setUpdateImage} from "../user/userSlice";

// export const userApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     updateAvatar: builder.mutation({
//       query: (avatar) => ({
//         url: "update-user-avatar",
//         method: "PUT",
//         body: { avatar },
//         credentials: "include" as const,
//       }),
//       async onQueryStarted({ avatar }, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           dispatch(setUpdateImage(avatar)); // ✅ Update Redux immediately
//         } catch (error) {
//           console.error("Error updating profile:", error);
//         }
//       },
//     }),

//     editProfile: builder.mutation({
//       query: ({ name }) => ({
//         url: "update-user-info",
//         method: "PUT",
//         body: { name },
//         credentials: "include" as const,
//       }),
//       async onQueryStarted({ name }, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           dispatch(updateUserName(name)); // ✅ Update Redux immediately
//         } catch (error) {
//           console.error("Error updating profile:", error);
//         }
//       },
//     }),

//     updatePassword: builder.mutation({
//       query: ({ oldPassword, newPassword }) => ({
//         url: "update-user-password",
//         method: "PUT",
//         body: { oldPassword, newPassword },
//         credentials: "include" as const,
//       }),
//     }),
//   }),
// });

// export const {
//   useUpdateAvatarMutation,
//   useEditProfileMutation,
//   useUpdatePasswordMutation,
// } = userApi;
import { apiSlice } from "../api/apiSlice";
import { updateUserName, setUpdateImage } from "../user/userSlice";

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
          dispatch(setUpdateImage(avatar));
        } catch (error) {
          console.error("Error updating avatar:", error);
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
          dispatch(updateUserName(name));
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

    // getAllUsers: builder.query({
    //   query: () => ({
    //     url: "get-users",
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    // }),

    getAllUsers: builder.query({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: [{ type: "GetAllUsers" } as const], 
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `delete-user/${userId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: ["GetAllUsers"], // Invalidate this tag on success
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: "update-user-role",
        method: "PUT",
        body: { id: userId, role },
        credentials: "include" as const,
      }),
      async onQueryStarted({ userId, role }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error updating user role:", error);
        }
      },
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = userApi;
