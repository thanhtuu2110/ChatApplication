import { User } from "./User.interface";

export type Message = {
  content: string;
  id: string;
  created_at: string;
  user: User;
};

export type MessageResponse = {
  items: Message[];
  skip: number;
  total: number;
  limit: number;
};
