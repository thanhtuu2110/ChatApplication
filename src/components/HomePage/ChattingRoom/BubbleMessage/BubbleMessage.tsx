import { ReactElement } from "react";
import { Avatar } from "antd";
import { Message } from "../../../../types/ChatMessage.interface";
import "./BubbleMessage.css";

type BubbleMessageProps = {
  isMessageFromCurrentUser: boolean;
  message: Message;
};

export const BubbleMessage = (props: BubbleMessageProps): ReactElement => {
  const { isMessageFromCurrentUser } = props;
  const { user, content, id, created_at } = props.message;
  const renderText = (): ReactElement => {
    if (isMessageFromCurrentUser) {
      return (
        <div className="text-container">
          <p className="from-me">{content}</p>
        </div>
      );
    }
    return <p className="from-them">{content}</p>;
  };
  const time = new Date(created_at);

  return (
    <div
      data-testid="bubble-message"
      className={`${
        isMessageFromCurrentUser
          ? "bubble-message-reverse-container"
          : "bubble-message-container"
      } `}
    >
      <div className="avatar">
        <Avatar
          size="large"
          style={{ color: "#000000", backgroundColor: "#c4c4c4" }}
        >
          {user.name.slice(0, 2).toUpperCase()}
        </Avatar>
      </div>
      <div className="imessage">
        {renderText()}

        <p
          className={
            isMessageFromCurrentUser ? "date-time-right-align" : "date-time"
          }
        >
          {time.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
