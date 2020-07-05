import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import NewUser from './containers/NewUser';
import Signup from "./containers/Signup";
import WaterCooler from './containers/WaterCooler';
import ConfirmUser from './containers/ConfirmUser';
import Unsubscribe from './containers/Unsubscribe';
import ConfirmUnsubscribe from './containers/ConfirmUnsubscribe';

export default function Routes() {
  return (
<Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/signup">
      <Signup />
    </Route>
    <Route exact path="/users/new">
      <NewUser />
    </Route>
    <Route exact path="/users/watercooler">
      <WaterCooler />
    </Route>
    <Route path="/confirmation/:orgId/:userId">
      <ConfirmUser />
    </Route>
    <Route exact path="/unsubscribe">
      <Unsubscribe />
    </Route>
    <Route path="/unsubscribe/:orgId/:userId">
      <ConfirmUnsubscribe />
    </Route>
    <Route>
      <NotFound />
    </Route>
</Switch>
  );
}