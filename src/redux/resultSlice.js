import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
  name: "results",
  initialState: {
    documents: [],
  },
  reducers: {
    setResults: (state, action) => {
      state.documents = action.payload.results;
    },
  },
});

export const { setResults } = resultSlice.actions;

export default resultSlice.reducer;
