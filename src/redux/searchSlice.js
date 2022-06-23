import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    tags: [],
    fields: {},
  },
  reducers: {
    addTag: (state, action) => {
      console.log(action.payload);
      console.log(action.payload.id);
      state.tags = [1, 2, 3];
    },
    setField: (state, action) => {
      state.fields[action.id] = action.value;
    },
  },
});

export const { addTag, setField } = searchSlice.actions;

export default searchSlice.reducer;
