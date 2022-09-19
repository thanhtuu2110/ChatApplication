import React, { useState } from "react";
import { NavBar, InfoPage } from "./components";
import "antd/dist/antd.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { HomePage } from "./components/HomePage/Homepage";
import { useDispatch } from "react-redux";
import { fetchMessages } from "./store/message/message-action";
import { fetchUsers, registerUser } from "./store/user/user-action";
import { RegisterUserModal } from "./components/common/RegisterUserModal/RegisterUserModal";
import { User } from "./types/User.interface";

function App() {
  const dispatch = useDispatch();
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(true);
  const [enteredName, setEnteredName] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>();
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  const handleSubmitModal = async (): Promise<void> => {
    setFetchingData(true);
    const registeredUser = await dispatch(
      registerUser({ id: `${Math.random()}`, name: enteredName })
    );
    setCurrentUser(registeredUser);
    await Promise.all([dispatch(fetchMessages()), dispatch(fetchUsers())]);
    setFetchingData(false);
    setIsOpenRegisterModal(false);
  };

  return (
    <>
      <RegisterUserModal
        fetchingData={fetchingData}
        enteredName={enteredName}
        isVisible={isOpenRegisterModal}
        onSave={handleSubmitModal}
        onChangeInput={setEnteredName}
      />
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <HomePage currentUser={currentUser} />
        </Route>
        <Route path="/info" exact>
          <InfoPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
