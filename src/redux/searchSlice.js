import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    tags: [],
    fields: {},
  },
  reducers: {
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
    addField: (state, action) => {
      state.fields[action.id] = action.value;
    },
    restoreSearch: (state, action) => {
      state.tags = action.payload.restored;
      state.fields = action.payload.fields;
    },
  },
});

export const { addTag, addField, restoreSearch } = searchSlice.actions;

export default searchSlice.reducer;
