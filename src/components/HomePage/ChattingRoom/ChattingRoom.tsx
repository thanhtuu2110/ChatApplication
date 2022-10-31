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

export const ChattingRoom = (props: ChattingRoomProps): ReactElement => {
  const { currentUser } = props;
  const dispatch = useDispatch();
  const { items: messages, total: totalMessages } = useSelector(
    (state: any) => state.messages
  );

  const numberTimeOfSkippedMessage = useRef<number>(1);
  const chattingRoomRef = useRef<HTMLDivElement>(null);
  const oldChattingRoomScrollHeight = useRef<number>(0);

  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(false);
  const isFirstRenderRef = useRef<boolean>(true);

  const onLoadMoreMessages = async (): Promise<void> => {
    await dispatch(
      fetchMoreMessages(
        numberTimeOfSkippedMessage.current * DEFAULT_NUMBER_OF_SKIP_MESSAGES
      )
    );

    chattingRoomRef.current!.scrollTop =
      chattingRoomRef.current!.scrollHeight -
      oldChattingRoomScrollHeight.current -
      100;
    oldChattingRoomScrollHeight.current = chattingRoomRef.current!.scrollHeight;

    numberTimeOfSkippedMessage.current++;
    if (
      (numberTimeOfSkippedMessage.current * DEFAULT_NUMBER_OF_SKIP_MESSAGES) /
        totalMessages >
      1
    ) {
      setHasMoreMessages(true);
    }
  };

  // Scroll to bottom of the chat room for getting latest message whenever get a new message and 1st render
  useEffect(() => {
    if (
      numberTimeOfSkippedMessage.current > 1 ||
      messages.length === 0 ||
      !isFirstRenderRef.current
    ) {
      return;
    }

    chattingRoomRef.current!.scrollTop = chattingRoomRef.current!.scrollHeight;
    oldChattingRoomScrollHeight.current = chattingRoomRef.current!.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
    }
  }, []);

  return (
    <div
      ref={chattingRoomRef}
      id="chatting-room"
      className={styles.chattingRoomContainer}
    >
      <div className={styles.upOutLinedIcon}>
        {hasMoreMessages ? (
          <p>Het tin nhan</p>
        ) : (
          <UpOutlined disabled={hasMoreMessages} onClick={onLoadMoreMessages} />
        )}
      </div>

      {[...messages].reverse().map((message: Message) => {
        const isMessageFromCurrentUser = message.user.id === currentUser!.id;
        return (
          <BubbleMessage
            isMessageFromCurrentUser={isMessageFromCurrentUser}
            key={message.id}
            message={message}
          />
        );
      })}
    </div>
  );
};
