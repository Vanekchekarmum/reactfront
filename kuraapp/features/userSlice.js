import React, { useState } from 'react'

import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  email: "",
  name: "",
}
export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.image = action.payload.image

    },
    unSetUserInfo: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.image = action.payload.image

    },
  }
})

export const { setUserInfo, unSetUserInfo } = userSlice.actions
export default userSlice.reducer