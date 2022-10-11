import React, { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar = (): ReactElement => {
  return (
    <div className={styles.introductionBarContainer}>
      {/* Comment... */}
      <div></div>

      <Link to="/">
        <h3 className={styles.chatRoomName}>Python chat room</h3>
      </Link>

      <nav>
        <ul className="list-of-navigation">
          <li>
            <NavLink className={styles.infoButton} to="/info">
              Info
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
