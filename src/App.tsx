import React, { useState } from "react";
import { NavBar, InfoPage } from "./components";
import "antd/dist/antd.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { HomePage } from "./components/HomePage/Homepage";

import { RegisterUserModal } from "./components/common/RegisterUserModal/RegisterUserModal";
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
          <HomePage currentUser={currentUser} />
        </Route>
        <Route path="/info">
          <InfoPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
