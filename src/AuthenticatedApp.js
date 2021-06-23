import * as React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import AdminPage from "./routes/AdminPage";
import HomePage from "./routes/HomePage";

import UserPage from "./routes/UserPage";
import WalkerPage from "./routes/WalkerPage";

function AuthenticatedApp(props) {
  const { logout, user } = props;
  return (
    <Router>
      <AuthenticatedHeader logout={logout} user={user} />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/walker">
          <WalkerPage />
        </Route>

        <Route path="/user">
          <UserPage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/">
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default AuthenticatedApp;
