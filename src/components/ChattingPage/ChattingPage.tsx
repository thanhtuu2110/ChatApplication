import { notification } from "antd";
import { ReactElement, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { User } from "../../types/User.interface";
import { ChattingRoom } from "./ChattingRoom/ChattingRoom";
import styles from "./ChattingPage.module.css";
import { MessageInput } from "./MessageInput/MessageInput";
import { messageActions } from "../../store/messages/messages-slice";
import { nanoid } from "nanoid";

type ChattingPageProps = {
  currentUser: User | undefined;
};

export const ChattingPage = (props: ChattingPageProps): ReactElement => {
  const dispatch = useDispatch();
  const { currentUser } = props;

  const webSocket = useRef<W3CWebSocket>();

  const sendTextMessage = (input: string): void => {
    if (!currentUser) return;
    const currentTime = new Date();
    dispatch(
      messageActions.sendMessage({
        content: input,
        id: nanoid(),
        user: currentUser,
        created_at: currentTime.toLocaleString(),
      })
    );
    webSocket.current!.send(input);
  };

  useEffect(() => {
    if (!currentUser) return;

    webSocket.current = new W3CWebSocket(
      `${import.meta.env.VITE_WEB_SOCKET_URL}/${currentUser.id}`
    );

    webSocket.current.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    webSocket.current.onmessage = async (): Promise<void> => {
      // await dispatch(fetchMessages());
      const chattingRoomContainer = document.getElementById("chatting-room");

      // Scroll to the newest message.
      chattingRoomContainer!.scrollTop =
        chattingRoomContainer?.scrollHeight || 0;
    };
    webSocket.current.onclose = (): void => {
      notification.error({
        message: "Web socket connection has been closed",
        description: "The chat box is not working currently, please try again!",
      });
    };
    webSocket.current.onerror = (): void => {
      notification.error({
        message: "Web socket connection has any errors",
        description: "Please refresh the website!!",
      });
      webSocket.current?.close();
    };
    return () => {
      webSocket.current?.close();
    };
  }, [currentUser]);

  return (
    <div className={styles.chattingPageContainer}>
      <ChattingRoom currentUser={currentUser} />
      <MessageInput onSend={sendTextMessage} />
    </div>
  );
};
