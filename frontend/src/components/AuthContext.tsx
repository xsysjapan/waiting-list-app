import * as React from "react";
import { User } from "../models";
import api from "../api";

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
  setUser: (user: User) => void;
  clearUser: () => void;
}

const AuthContext = React.createContext({
  loading: true,
  setUser: () => {},
  clearUser: () => {},
} as AuthContextValue);

const fetchSessionState = async () => {
  try {
    const result = await api.getSession();
    if (result.user) {
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
  const [state, setState] = React.useState({ loading: true } as AuthState);
  React.useEffect(() => {
    fetchSessionState().then((newState) => setState(newState));
  }, []);

  if (state.loading) {
    return <div>Loading ...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUser: async (user: User) => {
          setState({
            loading: false,
            user,
          });
        },
        clearUser: async () => {
          setState({ loading: false, user: undefined });
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => React.useContext(AuthContext);
