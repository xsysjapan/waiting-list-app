import * as React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  RouterProps,
  Switch,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { User } from "./models";

type GuardProps = { user: User | null } & RouteProps<string>;

const Guard = (props: GuardProps) => {
  const { user, component, ...routeProps } = props;
  return (
    <Route
      {...routeProps}
      component={
        user
          ? component
          : (props: RouterProps) => {
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
            }
      }
    />
  );
};

const App = () => {
  const [user, setUser] = React.useState(null as User | null);
  return (
    <BrowserRouter>
      <Switch>
        <Guard user={user} path="/" exact component={HomePage} />
        <Route
          path="/login"
          component={(props: RouterProps) => {
            if (user) {
              const search = props.history.location.search;
              const returnUrl = search
                ? new URLSearchParams(decodeURIComponent(search)).get("returnUrl")
                : "";
              return <Redirect to={returnUrl || "/"} />;
            } else {
              return <LoginPage {...props} onLoginSuccess={setUser} />;
            }
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
