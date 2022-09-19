import { Message } from "../../types/ChatMessage.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageSliceState = {
  items: Message[];
  total: number;
};

const initialMessages: MessageSliceState = {
  items: [],
  total: 0,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState: initialMessages,
  reducers: {
    replaceMessages(state, action: PayloadAction<MessageSliceState>): void {
      state.total = action.payload.total;
      state.items = action.payload.items;
    },
    addPreviousMessages(state, action: PayloadAction<Message[]>): void {
      state.items.push(...action.payload);
    },
    sendMessage(state, action: PayloadAction<Message>): void {
      const { content, id, user } = action.payload;
      state.total++;
      state.items.push({ content, id, user, created_at: "0" });
    },
  },
});

export const messageActions = messagesSlice.actions;

export default messagesSlice;
