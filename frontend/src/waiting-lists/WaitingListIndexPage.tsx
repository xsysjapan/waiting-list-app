import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "../404/NotFoundPage";
import WaitingListListPage from "./list/WaitingListListPage";
import CreateWaitingListPage from "./create/CreateWaitingListPage";
import WaitingListDetailsPage from "./details/WaitingListDetailsPage";

const WaitingListIndexPage = () => {
  return (
    <Switch>
      <Route path="/waiting-lists" exact component={WaitingListListPage} />
      <Route
        path="/waiting-lists/create"
        exact
        component={CreateWaitingListPage}
      />
      <Route
        path="/waiting-lists/:id"
        component={WaitingListDetailsPage}
      />
      <Route path="*" exact component={NotFoundPage} />
    </Switch>
  );
};

export default WaitingListIndexPage;
