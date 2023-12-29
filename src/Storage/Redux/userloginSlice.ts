import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userlogin: [],
  isAuthenticated: false,
  user: null,
};

export const userloginSlice = createSlice({
  name: "UserLogin",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUserLogin: (state, action) => {
      state.userlogin = action.payload;
    },
  },
});


export const { login, logout } = userloginSlice.actions;
export const { setUserLogin } = userloginSlice.actions;
export const userloginReducer = userloginSlice.reducer;
