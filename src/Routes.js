import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import NewUser from './containers/NewUser';


export default function Routes() {
  return (
<Switch>
    <Route exact path="/">
        <Home />
    </Route>
    <Route exact path="/login">
        <Login />
    </Route>
    <Route exact path="/users/new">
      <NewUser />
    </Route>
    <Route>
        <NotFound />
    </Route>
</Switch>
  );
}