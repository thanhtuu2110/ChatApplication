export type User = {
  id: string;
  name: string;
};

export type UserResponse = {
  items: User[];
  skip: number;
  total: number;
  limit: number;
};

export type RegisterUserResponse = {
  id: string;
  name: string;
};
