import * as React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
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
      component={user ? component : () => <Redirect to="/login" />}
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
            <LoginPage {...props} onUserLogin={(user) => setUser(user)} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
