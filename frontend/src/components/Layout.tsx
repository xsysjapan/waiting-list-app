import * as React from "react";
import api from "../api";
import { useAuthContext } from "./AuthContext";
import NavMenu from "./NavMenu";

export type LayoutProps = React.PropsWithChildren<{}>;

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const { user, clearUser } = useAuthContext();
  return (
    <div>
      <NavMenu
        user={user}
        onLogoutClick={async () => {
          await api.deleteSession();
          clearUser();
        }}
      />
      <div className="container-fluid">{children}</div>
    </div>
  );
};

export default Layout;
