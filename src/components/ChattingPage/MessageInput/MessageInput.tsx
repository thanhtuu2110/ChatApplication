import React, { ReactElement, useEffect, useState, useMemo } from "react";
import { Input, Button } from "antd";
import styles from "./MessageInput.module.css";

const { TextArea } = Input;

type MessageInputProps = {
  onSend: (input: string) => void;
};

const ENTER_KEY_CODE = 13;

export const MessageInput = (props: MessageInputProps): ReactElement => {
  const { onSend } = props;
  const [message, setMessage] = useState<string>("");

  const onSendMessage = () => {
    onSend(message);
    setMessage("");
  };

  const isValidMessage = message.replaceAll(/\s/g, "").length > 0;

  const onPressEnter = (event: any) => {
    event.preventDefault();
    if (
      event.nativeEvent.keyCode === ENTER_KEY_CODE &&
      !event.nativeEvent.shiftKey &&
      isValidMessage
    ) {
      onSendMessage();
    }
  };

  return (
    <div data-testid="message-input" className={styles.inputMessageContainer}>
      <TextArea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Compose new message here..."
        autoSize
        maxLength={256}
        onPressEnter={onPressEnter}
        className={`${styles}.ant-input-textarea`}
      />

      <Button
        data-testid="send-message-button"
        onClick={onSendMessage}
        disabled={!isValidMessage}
      >
        Send
      </Button>
    </div>
  );
};
