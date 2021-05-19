import * as React from "react";
import { LoginFormValues, User } from "../models";
import * as api from "../api";

type AuthState =
  | {
      loading: true;
    }
  | {
      loading: false;
      user: User | undefined;
      error?: string;
    };

interface AuthContextValue {
  loading: boolean;
  user?: User | undefined;
  error?: string;
  reload: () => void;
  login: (values: LoginFormValues) => void;
  logout: () => void;
}

const AuthContext = React.createContext({
  loading: true,
  login: (_) => {},
  logout: () => {},
} as AuthContextValue);

const fetchSessionState = async () => {
  try {
    const result = await api.session();
    if (result.succeeded) {
      return {
        loading: false,
        user: result.user,
      };
    } else {
      return {
        loading: false,
        user: undefined,
      };
    }
  } catch {
    return {
      loading: false,
      user: undefined,
    };
  }
};

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, setState] = React.useState({ loading: false } as AuthState);
  React.useEffect(() => {
    let unmounted = false;
    const f = async () => {
      const newState = await fetchSessionState();
      if (!unmounted) {
        setState(newState);
      }
    };
    f();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, []);
  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        reload: async () => setState(await fetchSessionState()),
        login: async (values) => {
          const result = await api.login(values);
          if (result.succeeded) {
            setState({
              loading: false,
              user: result.user,
            });
          } else {
            setState({
              loading: false,
              user: undefined,
              error: result.message,
            });
          }
        },
        logout: async () => {
          const result = await api.logout();
          if (result.succeeded) {
            setState(await fetchSessionState());
          } else {
            setState({ loading: false, user: undefined });
          }
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => React.useContext(AuthContext);
