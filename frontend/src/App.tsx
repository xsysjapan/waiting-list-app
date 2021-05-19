import * as React from "react";
import {
  Redirect,
  Route,
  RouteProps,
  RouterProps,
  Switch,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthContextProvider, useAuthContext } from "./components/AuthContext";

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
        <Route path="/login" component={LoginPage} />
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
    </AuthContextProvider>
  );
};

export default App;
