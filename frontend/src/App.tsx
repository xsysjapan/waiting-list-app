import * as React from "react";
import {
  Redirect,
  Route,
  RouteProps,
  RouterProps,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import { useAppSelector } from "./shared/hooks";
import configureStore from "./shared/configureStore";
import HomePage from "./home/HomePage";
import LoginPage from "./login/LoginPage";
import NotFoundPage from "./404/NotFoundPage";
import WaitingListIndexPage from "./waiting-lists/WaitingListIndexPage";
import CreateWaitingListPage from "./waiting-lists/CreateWaitingListPage";
import WaitingListDetailsPage from "./waiting-lists/WaitingListDetailsPage";
import AddWaitingListCustomerPage from "./waiting-lists/AddWaitingListCustomerPage";

type ProtectedRouteProps = RouteProps<string>;

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { component, ...routeProps } = props;
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Route
      {...routeProps}
      render={(props: RouterProps) => {
        if (user) {
          const Component = component as any;
          return <Component {...routeProps} />;
        }
        const href = props.history.createHref(props.history.location);
        return (
          <Redirect
            to={
              !href || href === "/"
                ? "/login"
                : "/login?returnUrl=" + encodeURIComponent(href)
            }
          />
        );
      }}
    />
  );
};

const App = () => {
  const store = React.useMemo(configureStore, []);
  return (
    <Provider store={store}>
      <Switch>
        <ProtectedRoute path="/" exact component={HomePage} />
        <ProtectedRoute
          path="/waiting-lists"
          exact
          component={WaitingListIndexPage}
        />
        <ProtectedRoute
          path="/waiting-lists/create"
          exact
          component={CreateWaitingListPage}
        />
        <ProtectedRoute
          path="/waiting-lists/:id"
          exact
          component={WaitingListDetailsPage}
        />
        <ProtectedRoute
          path="/waiting-lists/:id/addCustomer"
          exact
          component={AddWaitingListCustomerPage}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
    </Provider>
  );
};

export default App;
