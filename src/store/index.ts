import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messages/messages-slice";
import { usersSlice } from "./users/users-slice";

const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
