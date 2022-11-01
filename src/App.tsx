import "antd/dist/antd.css";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { InfoPage, NavBar } from "./components";
import { RegisterUserModal } from "./components/common/RegisterUserModal/RegisterUserModal";
import { ChattingPage } from "./components/ChattingPage/ChattingPage";
import { User } from "./types/User.interface";

function App() {
  const [currentUser, setCurrentUser] = useState<User>();

  return (
    <>
      <RegisterUserModal setCurrentUser={setCurrentUser} />
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <ChattingPage currentUser={currentUser} />
        </Route>
        <Route path="/info">
          <InfoPage />
        </Route>
        <Route path="*">
          <p>Page not found</p>
        </Route>
      </Switch>
    </>
  );
}

export default App;
