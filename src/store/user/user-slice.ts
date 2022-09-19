import { createSlice } from "@reduxjs/toolkit";

const initialUserStore = {
  items: [],
  total: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserStore,
  reducers: {
    replaceUserStore(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
  },
});

export const userActions = userSlice.actions;
