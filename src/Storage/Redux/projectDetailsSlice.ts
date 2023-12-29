import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectDetails: [],
};

export const projectDetailsSlice = createSlice({
  name: "ProjectDetails",
  initialState: initialState,
  reducers: {
    setProjectDetails: (state, action) => {
      state.projectDetails = action.payload;
    },
  },
});

export const { setProjectDetails } = projectDetailsSlice.actions;
export const projectDetailsReducer = projectDetailsSlice.reducer;
