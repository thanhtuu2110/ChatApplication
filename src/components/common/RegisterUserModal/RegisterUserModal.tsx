import { Modal, Input, Button, Form, InputRef } from "antd";
import styles from "./RegisterUserModal.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../../../store/messages/messages-action";
import { fetchUsers, registerUser } from "../../../store/users/users-action";
import { User } from "../../../types/User.interface";

type RegisterUserModalProps = {
  setCurrentUser: (user: User) => void;
};

export const RegisterUserModal = (props: RegisterUserModalProps) => {
  const { setCurrentUser } = props;
  const [inputUserName, setInputUserName] = useState<string>("");
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus({ cursor: "start" });
  }, []);

  const handleSubmitModal = async (): Promise<void> => {
    setIsLoading(true);
    const registeredUser = await dispatch(
      registerUser({ id: "", name: inputUserName })
    );

    setCurrentUser(registeredUser);
    await Promise.all([dispatch(fetchMessages()), dispatch(fetchUsers())]);
    setIsLoading(false);
    setIsVisible(false);
  };

  return (
    <Modal
      data-testid="register-modal"
      open={isVisible}
      footer={null}
      closable={false}
    >
      <Form onFinish={handleSubmitModal} layout="vertical">
        <Form.Item
          label="User name"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            ref={inputRef}
            placeholder="Input your name"
            onChange={(e) => setInputUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item className={styles.buttons}>
          <Button
            loading={isLoading}
            disabled={!inputUserName}
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
