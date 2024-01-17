import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8080/api/user/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register",
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "Application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login",
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "Application/json",
          },
        };
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "send-reset-password-email",
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "Application/json",
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ data, id, token }) => {
        // console.log(data,id,token)
        return {
          url: `/reset-password/${id}/${token}`,
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "Application/json",
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: `loggeduser`,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: ({ data, token }) => {
        return {
          url: `changepassword`,
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useGetLoggedUserQuery,
  useChangeUserPasswordMutation
} = userAuthApi;
