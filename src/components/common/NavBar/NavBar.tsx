import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar = (): ReactElement => {
  return (
    <div className={styles.introductionBarContainer}>
      <div></div>
      <Link to="/">
        <h3 className={styles.chatRoomName}>Python chat room</h3>
      </Link>
      <div>
        <Link className={styles.infoButton} to="/info">
          Info
        </Link>
      </div>
    </div>
  );
};
