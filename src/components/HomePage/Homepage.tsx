import React, { useRef, useEffect, ReactElement } from "react";
import { ChattingRoom } from "./ChattingRoom/ChattingRoom";
import { MessageInput } from "./MessageInput/MessageInput";
import styles from "./Homepage.module.css";
import { User } from "../../types/User.interface";
import { useDispatch } from "react-redux";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { fetchMessages } from "../../store/message/message-action";

type HomePageProps = {
  currentUser: User | undefined;
};

export const HomePage = (props: HomePageProps): ReactElement => {
  const dispatch = useDispatch();
  const { currentUser } = props;
  const webSocket = useRef<W3CWebSocket>();

  const sendTextMessage = (input: string): void => {
    webSocket.current!.send(input);
  };

  useEffect(() => {
    if (!currentUser) return;
    webSocket.current = new W3CWebSocket(
      `ws://localhost:8000/chat/${currentUser.id}`
    );
    webSocket.current.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    webSocket.current.onmessage = async (): Promise<void> => {
      await dispatch(fetchMessages());
      const chattingRoomContainer = document.getElementById("chatting-room");
      chattingRoomContainer!.scrollTop =
        chattingRoomContainer?.scrollHeight || 0;
    };
    return () => {
      webSocket.current!.onclose;
    };
  }, [currentUser]);

  return (
    <div className={styles.homePageContainer}>
      <ChattingRoom currentUser={currentUser} />
      <MessageInput sendANewMessage={sendTextMessage} />
    </div>
  );
};
