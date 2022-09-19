import React, { ReactElement, useState } from "react";
import { Input, Button, Form } from "antd";
import styles from "./MessageInput.module.css";

const { TextArea } = Input;

type MessageInputProps = {
  sendANewMessage: (input: string) => void;
};

export const MessageInput = (props: MessageInputProps): ReactElement => {
  const { sendANewMessage } = props;
  const [enteredMessage, setEnteredMessage] = useState<string>("");

  const onSendMessage = () => {
    sendANewMessage(enteredMessage);
    setEnteredMessage("");
  };

  const onPressEnter = (event: any) => {
    if (event.nativeEvent.keyCode === 13 && !event.nativeEvent.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className={styles.inputMessageContainer}>
      <TextArea
        value={enteredMessage}
        onChange={(event) => setEnteredMessage(event.target.value)}
        placeholder="Compose new message here..."
        autoSize
        onPressEnter={onPressEnter}
        allowClear={true}
      />

      <Button onClick={onSendMessage} disabled={!enteredMessage}>
        Send
      </Button>
    </div>
  );
};
