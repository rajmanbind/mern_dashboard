import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
};

export const userSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    unsetUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;
export default userSlice.reducer;
