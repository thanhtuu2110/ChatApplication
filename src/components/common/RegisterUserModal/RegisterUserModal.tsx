import { Button, Form, Input, InputRef, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../../../store/messages/messages-action";
import { fetchUsers, registerUser } from "../../../store/users/users-action";
import { User } from "../../../types/User.interface";
import styles from "./RegisterUserModal.module.css";

type RegisterUserModalProps = {
  setCurrentUser: (user: User) => void;
};

export const RegisterUserModal = (props: RegisterUserModalProps) => {
  const { setCurrentUser } = props;
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus({ cursor: "start" });
  }, []);

  const handleSubmitModal = async (values: any): Promise<void> => {
    setIsLoading(true);
    const registeredUser = await dispatch(
      registerUser({ id: "", name: values.username })
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
          rules={[
            { required: true, message: "Please input your username!" },
            () => ({
              validator(_, value = "") {
                if (value.length <= 100 && value.length >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Please input your username that not over 100 letters!"
                  )
                );
              },
            }),
          ]}
        >
          <Input ref={inputRef} placeholder="Input your name" />
        </Form.Item>
        <Form.Item className={styles.buttons}>
          <Button loading={isLoading} htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
