import React, { useState } from 'react'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const appPostApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({
    addPost: builder.mutation({
        query: ({ formdata, access }) => {
            return {
              url: 'comments/',
              method: 'POST',
              body: formdata,
              headers: {
                'authorization': `Bearer ${access}`,
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
              }
            }
          }
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: 'profile/',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),
    changeUserPassword: builder.mutation({
      query: ({ formdata, access }) => {
        return {
          url: 'changepassword/',
          method: 'POST',
          body: formdata,
          headers: {
            'authorization': `Bearer ${access}`,
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'send-reset-password-email/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
  }),
})

export const { useAddPostMutation} = appPostApi