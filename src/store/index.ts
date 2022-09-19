import { configureStore } from "@reduxjs/toolkit";

import messagesSlice from "./message/message-slice";
import { userSlice } from "./user/user-slice";

const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
    users: userSlice.reducer,
  },
});

export default store;
