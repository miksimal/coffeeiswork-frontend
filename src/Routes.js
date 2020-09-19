import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import NewUser from './containers/NewUser';
import Signup from "./containers/Signup";
import WaterCooler from './containers/WaterCooler';
import ConfirmMember from './containers/ConfirmMember';
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
    <Route exact path="/members/new">
      <NewUser />
    </Route>
    <Route exact path="/members/watercooler">
      <WaterCooler />
    </Route>
    <Route path="/confirmation/:orgId/:email/:tokenId">
      <ConfirmMember />
    </Route>
    <Route exact path="/unsubscribe/:orgId">
      <Unsubscribe />
    </Route>
    <Route exact path="/confirmunsubscribe/:orgId/:email/:tokenId">
      <ConfirmUnsubscribe />
    </Route>
    <Route>
      <NotFound />
    </Route>
</Switch>
  );
}