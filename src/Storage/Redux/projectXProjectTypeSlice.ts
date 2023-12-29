import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectXProjectType: [],
};

export const projectXProjectTypeSlice = createSlice({
  name: "ProjectXProjectType",
  initialState: initialState,
  reducers: {
    setProjectXProjectType: (state, action) => {
      state.projectXProjectType = action.payload;
    },
  },
});

export const { setProjectXProjectType } = projectXProjectTypeSlice.actions;
export const projectXProjectTypeReducer = projectXProjectTypeSlice.reducer;
