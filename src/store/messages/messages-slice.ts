import { Message } from "../../types/ChatMessage.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageSliceState = {
  items: Message[];
  total: number;
};

const initialMessages: MessageSliceState = {
  items: [],
  // items: [
  //   {
  //     id: "6323edbe1407876bc8ee4e7e",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "asd",
  //     created_at: "2022-09-16T03:30:06.182000",
  //   },
  //   {
  //     id: "6323edba1407876bc8ee4e7d",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "asdsd\n\nasd",
  //     created_at: "2022-09-16T03:30:02.058000",
  //   },
  //   {
  //     id: "6323edb61407876bc8ee4e7c",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "dasd",
  //     created_at: "2022-09-16T03:29:58.526000",
  //   },
  //   {
  //     id: "6323edb31407876bc8ee4e7b",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "hi",
  //     created_at: "2022-09-16T03:29:55.763000",
  //   },
  //   {
  //     id: "6322f7d1be4d4f5bccc9fd89",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "Latest",
  //     created_at: "2022-09-15T10:00:49.864000",
  //   },
  //   {
  //     id: "6322f7c4be4d4f5bccc9fd88",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "New messages",
  //     created_at: "2022-09-15T10:00:36.894000",
  //   },
  //   {
  //     id: "6322f7bfbe4d4f5bccc9fd87",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "Bump",
  //     created_at: "2022-09-15T10:00:31.247000",
  //   },
  //   {
  //     id: "6322f7b6be4d4f5bccc9fd86",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "Bump",
  //     created_at: "2022-09-15T10:00:22.541000",
  //   },
  //   {
  //     id: "6322f7aabe4d4f5bccc9fd85",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "Bump",
  //     created_at: "2022-09-15T10:00:10.377000",
  //   },
  //   {
  //     id: "6322f6cfbe4d4f5bccc9fd84",
  //     user: {
  //       id: "632188cd356851b9bc0104e9",
  //       name: "Tuu ne",
  //     },
  //     content: "Thanh Tuu",
  //     created_at: "2022-09-15T09:56:31.622000",
  //   },
  // ],
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
      state.items = action.payload.concat(state.items);
    },
    sendMessage(state, action: PayloadAction<Message>): void {
      const { content, id, user, created_at } = action.payload;
      state.total++;
      const newItems = state.items.slice(1);
      newItems.push({ content, id, user, created_at });
      state.items = newItems;
    },
  },
});

export const messageActions = messagesSlice.actions;

export default messagesSlice;
