import React, { ReactElement } from "react";
import styles from "./UserDisplay.module.css";
import { Avatar } from "antd";
import { User } from "../../../types/User.interface";

type UserDisplay = {
  user: User;
};

export const UserDisplay = (props: UserDisplay): ReactElement => {
  const { user } = props;
  return (
    <div data-testid="user-info" className={styles.userContainer}>
      <div className={styles.avatarContainer}>
        <Avatar
          size={60}
          style={{ color: "#000000", backgroundColor: "#c4c4c4" }}
        >
          {user.name.slice(0, 2).toUpperCase()}
        </Avatar>
      </div>
      <div className={styles.lineBreak} />
      <div className={styles.userName}>
        <div>
          <p>Name: {user.name}</p>
          <p>Id: {user.id}</p>
        </div>
      </div>
    </div>
  );
};
