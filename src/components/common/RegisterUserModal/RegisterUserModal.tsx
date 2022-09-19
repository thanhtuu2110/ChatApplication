import { Modal, Input, Button, Form, InputRef } from "antd";
import styles from "./RegisterUserModal.module.css";
import { useEffect, useRef } from "react";

type RegisterUserModalProps = {
  enteredName: string;
  isVisible: boolean;
  fetchingData: boolean;
  onSave: () => void;
  onChangeInput: (value: string) => void;
};

export const RegisterUserModal = (props: RegisterUserModalProps) => {
  const inputRef = useRef<InputRef>(null);
  const { fetchingData, enteredName, isVisible, onSave, onChangeInput } = props;

  useEffect(() => {
    inputRef.current!.focus({ cursor: "start" });
  }, []);

  return (
    <Modal open={isVisible} footer={null} closable={false}>
      <Form onFinish={onSave} layout="vertical">
        <Form.Item
          label="User name"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            ref={inputRef}
            placeholder="Input your name"
            onChange={(e) => onChangeInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item className={styles.buttons}>
          <Button
            loading={fetchingData}
            disabled={!enteredName}
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
