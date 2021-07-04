import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "../404/NotFoundPage";
import WaitingListListPage from "./index/WaitingListListPage";
import CreateWaitingListPage from "./create/CreateWaitingListPage";
import EditWaitingListPage from "./edit/EditWaitingListPage";
import WaitingListDetailsPage from "./details/WaitingListDetailsPage";
import AddWaitingListCustomerPage from "./add-customer/AddWaitingListCustomerPage";
import EditWaitingListCustomerPage from "./edit-customer/EditWaitingListCustomerPage";

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
        exact
        component={WaitingListDetailsPage}
      />
      <Route
        path="/waiting-lists/:id/edit"
        exact
        component={EditWaitingListPage}
      />
      <Route
        path="/waiting-lists/:id/customers/create"
        exact
        component={AddWaitingListCustomerPage}
      />
      <Route
        path="/waiting-lists/:id/customers/:customerId/edit"
        exact
        component={EditWaitingListCustomerPage}
      />
      <Route path="*" exact component={NotFoundPage} />
    </Switch>
  );
};

export default WaitingListIndexPage;
