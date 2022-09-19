import React, { ReactElement } from "react";
import styles from "./InfoPage.module.css";
import { UserDisplay } from "./UserDisplay/UserDisplay";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../types/User.interface";
import { Pagination } from "antd";
import { fetchUsers } from "../../store/user/user-action";

export const InfoPage = (): ReactElement => {
  const dispatch = useDispatch();
  const { items: users, total } = useSelector((state: any) => state.users);
  const onHandleNextPagination = (page: number, pageSize: number) => {
    dispatch(fetchUsers(page - 1));
  };
  return (
    <>
      <div className={styles.infoPageContainer}>
        <div className={styles.displayContent}>
          {users.map((user: User) => {
            return <UserDisplay key={user.id} user={user} />;
          })}
        </div>
      </div>
      <div className={styles.pagination}>
        {total > 0 && (
          <Pagination
            defaultCurrent={1}
            total={total}
            pageSize={10}
            onChange={onHandleNextPagination}
          />
        )}
      </div>
    </>
  );
};
