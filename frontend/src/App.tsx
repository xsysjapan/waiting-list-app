import * as React from "react";
import {
  Redirect,
  Route,
  RouteProps,
  RouterProps,
  Switch,
} from "react-router-dom";
import HomePage from "./home/HomePage";
import LoginPage from "./login/LoginPage";
import NotFoundPage from "./404/NotFoundPage";
import WaitingListDetailsPage from "./waiting-lists/WaitingListDetailsPage";
import { AuthContextProvider, useAuthContext } from "./shared/AuthContext";

type ProtectedRouteProps = RouteProps<string>;

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { component, ...routeProps } = props;
  const { user } = useAuthContext();
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
  return (
    <AuthContextProvider>
      <Switch>
        <ProtectedRoute path="/" exact component={HomePage} />
        <ProtectedRoute
          path="/waiting-lists/:id"
          exact
          component={WaitingListDetailsPage}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
    </AuthContextProvider>
  );
};

export default App;
