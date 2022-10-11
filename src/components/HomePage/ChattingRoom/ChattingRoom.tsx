import React, { useState, useEffect, useRef, ReactElement } from "react";
import { BubbleMessage } from "./BubbleMessage/BubbleMessage";
import styles from "./ChattingRoom.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../types/ChatMessage.interface";
import { User } from "../../../types/User.interface";
import { fetchMoreMessages } from "../../../store/messages/messages-action";
import { UpOutlined } from "@ant-design/icons";

type ChattingRoomProps = {
  currentUser: User | undefined;
};

const DEFAULT_NUMBER_OF_SKIP_MESSAGES = 10;

export enum UserType {
  FROM_ME = "from-me",
  FROM_THEM = "from-them",
}

export const ChattingRoom = (props: ChattingRoomProps): ReactElement => {
  const { currentUser } = props;

  const dispatch = useDispatch();
  const { items: messages, total: totalMessages } = useSelector(
    (state: any) => state.messages
  );

  const numberTimeOfSkippedMessage = useRef<number>(1);
  const chattingRoomRef = useRef<HTMLDivElement>(null);
  const oldScrollHeight = useRef<number>(0);

  const [
    hasNumberOfSkippedTimeGreaterThanTotalMessages,
    setHasNumberOfSkippedTimeGreaterThanTotalMessages,
  ] = useState<boolean>(false);
  const initialStateRef = useRef<boolean>(true);

  const onLoadMoreMessages = async (): Promise<void> => {
    await dispatch(
      fetchMoreMessages(
        numberTimeOfSkippedMessage.current * DEFAULT_NUMBER_OF_SKIP_MESSAGES
      )
    );
    chattingRoomRef.current!.scrollTop =
      chattingRoomRef.current!.scrollHeight - oldScrollHeight.current - 100;
    oldScrollHeight.current = chattingRoomRef.current!.scrollHeight;

    numberTimeOfSkippedMessage.current++;
    if (
      (numberTimeOfSkippedMessage.current * DEFAULT_NUMBER_OF_SKIP_MESSAGES) /
        totalMessages >
      1
    ) {
      setHasNumberOfSkippedTimeGreaterThanTotalMessages(true);
    }
  };

  //Scroll to bottom of the chat room for getting latest message
  useEffect(() => {
    if (
      numberTimeOfSkippedMessage.current > 1 ||
      messages.length === 0 ||
      !initialStateRef.current
    )
      return;

    chattingRoomRef.current!.scrollTop = chattingRoomRef.current!.scrollHeight;
    oldScrollHeight.current = chattingRoomRef.current!.scrollHeight;
    initialStateRef.current = false;
  }, [messages]);

  return (
    <div
      ref={chattingRoomRef}
      id="chatting-room"
      className={styles.chattingRoomContainer}
    >
      {hasNumberOfSkippedTimeGreaterThanTotalMessages ? (
        <p className={styles.upOutLinedIcon}>Het tin nhan</p>
      ) : (
        <UpOutlined
          disabled={hasNumberOfSkippedTimeGreaterThanTotalMessages}
          onClick={onLoadMoreMessages}
          className={styles.upOutLinedIcon}
        />
      )}

      {[...messages].reverse().map((message: Message) => {
        const userType =
          message.user.id === currentUser!.id
            ? UserType.FROM_ME
            : UserType.FROM_THEM;
        return (
          <BubbleMessage
            userType={userType}
            key={message.id}
            message={message}
          />
        );
      })}
    </div>
  );
};
