import { createSlice } from "@reduxjs/toolkit";

const initialUsersStore = {
  items: [],
  total: 0,
};

export const usersSlice = createSlice({
  name: "user",
  initialState: initialUsersStore,
  reducers: {
    replaceUserStore(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
  },
});

export const userActions = usersSlice.actions;
