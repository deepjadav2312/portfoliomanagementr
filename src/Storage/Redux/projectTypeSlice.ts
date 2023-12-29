import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectType: [],
};

export const projectTypeSlice = createSlice({
  name: "ProjectType",
  initialState: initialState,
  reducers: {
    setProjectType: (state, action) => {
      state.projectType = action.payload;
    },
  },
});

export const { setProjectType } = projectTypeSlice.actions;
export const projectTypeReducer = projectTypeSlice.reducer;
