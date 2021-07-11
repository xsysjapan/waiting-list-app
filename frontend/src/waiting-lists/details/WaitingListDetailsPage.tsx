import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "../../404/NotFoundPage";
import WaitingListDetailsPage from "./detail/WaitingListDetailsPage";
import EditWaitingListPage from "./edit/EditWaitingListPage";
import AddWaitingListCustomerPage from "./add-customer/AddWaitingListCustomerPage";
import EditWaitingListCustomerPage from "./edit-customer/EditWaitingListCustomerPage";

const RoutePage = () => {
  return (
    <Switch>
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
        path="/waiting-lists/:id/customers/add"
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

export default RoutePage;
