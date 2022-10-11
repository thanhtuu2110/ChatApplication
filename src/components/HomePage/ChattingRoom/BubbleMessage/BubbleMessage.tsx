import React, { ReactElement } from "react";
import { Avatar } from "antd";
import { Message } from "../../../../types/ChatMessage.interface";
import "./BubbleMessage.css";
import { UserType } from "../ChattingRoom";

type BubbleMessageProps = {
  userType: string;
  message: Message;
};

export const BubbleMessage = (props: BubbleMessageProps): ReactElement => {
  const { userType } = props;
  const { user, content, id, created_at } = props.message;

  const renderText = (fromWhom: string): ReactElement => {
    if (fromWhom === UserType.FROM_ME) {
      return (
        <div className="text-container">
          <p className={fromWhom}>{content}</p>
        </div>
      );
    }
    return <p className={fromWhom}>{content}</p>;
  };

  const time = new Date(created_at);

  return (
    <div
      data-testid="bubble-message"
      className={`${
        userType === UserType.FROM_THEM
          ? "bubble-message-container"
          : "bubble-message-reverse-container"
      } `}
    >
      <div className="avatar">
        <Avatar
          size="large"
          style={{ color: "#000000", backgroundColor: "#c4c4c4" }}
        >
          {user.name}
        </Avatar>
      </div>
      <div className="imessage">
        {renderText(userType)}
        <p
          className={`${
            userType === UserType.FROM_THEM
              ? "date-time"
              : "date-time-right-align"
          } `}
        >
          {time.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
