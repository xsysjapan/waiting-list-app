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
                      : "/login?returnUrl=" + href
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
          component={(props: any) => (
            <LoginPage
              {...props}
              onLogin={(values) => setUser({ username: values.username })}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
