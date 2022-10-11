import React, { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar = (): ReactElement => {
  return (
    <div className={styles.introductionBarContainer}>
      {/* This is a fake div for making chat room name center */}
      <div />

      <Link className={styles.chatRoomName} to="/">
        <h3>Python chat room</h3>
      </Link>

      <nav className={styles.navbarContainer}>
        <ul>
          <li>
            <NavLink className={styles.actionButton} to="/info">
              Info
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
