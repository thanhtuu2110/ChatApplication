import React, { useState, useEffect, useRef, ReactElement } from "react";
import { BubbleMessage } from "./BubbleMessage/BubbleMessage";
import styles from "./ChattingRoom.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../types/ChatMessage.interface";
import { User } from "../../../types/User.interface";
import { fetchMoreMessages } from "../../../store/message/message-action";
import { UpOutlined } from "@ant-design/icons";

type ChattingRoomProps = {
  currentUser: User | undefined;
};

export enum UserType {
  FROM_ME = "from-me",
  FROM_THEM = "from-them",
}

export const ChattingRoom = (props: ChattingRoomProps): ReactElement => {
  const skipTimeOfMessage = useRef<number>(1);
  const chattingRoomRef = useRef<any>();
  const oldScrollHeight = useRef<number>(0);

  const [isSkipTimeGreaterThanTotal, setIsSkipTimeGreaterThanTotal] =
    useState<boolean>(false);
  const initialStateRef = useRef<boolean>(true);

  const dispatch = useDispatch();
  const { currentUser } = props;
  const { items: messages, total: totalMessages } = useSelector(
    (state: any) => state.messages
  );

  const onLoadMoreMessages = async (): Promise<void> => {
    await dispatch(fetchMoreMessages(skipTimeOfMessage.current * 10));
    chattingRoomRef.current!.scrollTop =
      chattingRoomRef.current!.scrollHeight - oldScrollHeight.current - 100;
    oldScrollHeight.current = chattingRoomRef.current!.scrollHeight;

    skipTimeOfMessage.current++;
    if ((skipTimeOfMessage.current * 10) / totalMessages > 1) {
      setIsSkipTimeGreaterThanTotal(true);
    }
  };

  //Scroll to bottom of the chat room for getting latest message
  useEffect(() => {
    if (
      skipTimeOfMessage.current > 1 ||
      messages.length <= 0 ||
      !initialStateRef.current
    )
      return;
    chattingRoomRef.current!.scrollTop = chattingRoomRef.current!.scrollHeight;
    oldScrollHeight.current = chattingRoomRef.current!.scrollHeight;
    initialStateRef.current = false;
  }, [messages]);

  return (
    <>
      <div
        ref={chattingRoomRef}
        id="chatting-room"
        className={styles.chattingRoomContainer}
      >
        {isSkipTimeGreaterThanTotal ? (
          <p className={styles.upOutLinedIcon}>Het tin nhan</p>
        ) : (
          <UpOutlined
            disabled={isSkipTimeGreaterThanTotal}
            onClick={onLoadMoreMessages}
            className={styles.upOutLinedIcon}
          />
        )}

        {[...messages].reverse().map((message: Message) => {
          const fromWhom =
            message.user.id === currentUser!.id
              ? UserType.FROM_ME
              : UserType.FROM_THEM;
          return (
            <BubbleMessage
              fromWhom={fromWhom}
              key={message.id}
              message={message}
            />
          );
        })}
      </div>
    </>
  );
};
