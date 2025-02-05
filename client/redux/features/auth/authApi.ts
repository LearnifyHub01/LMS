import { apiSlice } from "../api/apiSlice";
import { setUser } from "../user/userSlice";
import { userLoggedIn, userLoggedOut, userRegistration,userSessions } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //query like get requet  and mutation like post
    //this  is use for sending request
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      //this is get data and save into userRegistration reducer
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
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
          dispatch(setUser(result.data.user))
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
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
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            userLoggedOut()
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logoutFromAll: builder.query({
      query: () => ({
        url: "logout-from-all",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            userLoggedOut()
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    sessionInfo: builder.query({
      query: () => ({
        url: "user-sessions",
        method: "GET",
        credentials: "include" as const,
      }),
    
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled; 
          dispatch(userSessions(data));
        } catch (error: any) {
          console.error("Error fetching sessions:", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
  useLogoutFromAllQuery,
  useSessionInfoQuery
} = authApi;
