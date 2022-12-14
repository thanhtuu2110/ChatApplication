import { messageActions } from "./messages-slice";
import { MessageResponse } from "../../types/ChatMessage.interface";
import { notification } from "antd";

export const fetchMessages = (): any => {
  return async (dispatch: any) => {
    const fetchMessagesData = async (): Promise<MessageResponse> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages?limit=10&skip=0`
      );

      if (!response.ok) {
        throw new Error("Could not fetch messages data");
      }

      const data = await response.json();
      return data;
    };
    try {
      const messageData = await fetchMessagesData();
      dispatch(
        messageActions.replaceMessages({
          items: messageData.items.reverse() || [],
          total: messageData.total,
        })
      );
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Web socket connection has any errors",
        description: "Please refresh the website!!",
      });
    }
  };
};

export const fetchMoreMessages = (skipTime: number): any => {
  return async (dispatch: any) => {
    const fetchMessagesData = async (): Promise<MessageResponse> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages?limit=10&skip=${skipTime}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch messages data");
      }

      const data = await response.json();
      return data;
    };
    try {
      const messageData = await fetchMessagesData();
      dispatch(
        messageActions.addPreviousMessages(messageData.items.reverse() || [])
      );
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Web socket connection has any errors",
        description: "Please refresh the website!!",
      });
    }
  };
};
