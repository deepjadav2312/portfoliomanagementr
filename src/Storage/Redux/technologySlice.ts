import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  technology: [],
};

export const technologySlice = createSlice({
  name: "Technology",
  initialState: initialState,
  reducers: {
    setTechnology: (state, action) => {
      state.technology = action.payload;
    },
  },
});

export const { setTechnology } = technologySlice.actions;
export const technologyReducer = technologySlice.reducer;
