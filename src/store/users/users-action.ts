import {
  UserResponse,
  RegisterUserResponse,
  User,
} from "../../types/User.interface";
import { userActions } from "./users-slice";

export const fetchUsers = (skipTime = 0): any => {
  return async (dispatch: any): Promise<void> => {
    const fetchUsersData = async (): Promise<UserResponse> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users?limit=10&skip=${skipTime * 10}`
      );
      if (!response.ok) {
        throw new Error("Could not fetch users data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const usersData = await fetchUsersData();
      dispatch(
        userActions.replaceUserStore({
          items: usersData.items,
          total: usersData.total,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const registerUser = (newUser: User): any => {
  return async (dispatch: any): Promise<any> => {
    const registerNewUser = async (): Promise<RegisterUserResponse> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Could not create new user");
      }
      const data = await response.json();
      return data;
    };
    try {
      const registeredUser = await registerNewUser();
      return registeredUser;
    } catch (error) {
      console.error(error);
    }
  };
};
