import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectXTechnology: [],
};

export const projectXTechnologySlice = createSlice({
  name: "ProjectXTechnology",
  initialState: initialState,
  reducers: {
    setProjectXTechnology: (state, action) => {
      state.projectXTechnology = action.payload;
    },
  },
});

export const { setProjectXTechnology } = projectXTechnologySlice.actions;
export const projectXTechnologyReducer = projectXTechnologySlice.reducer;
