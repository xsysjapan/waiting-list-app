import * as React from "react";
import { logout } from "./authReducer";
import { useAppDispatch, useAppSelector } from "./hooks";
import NavMenu from "./NavMenu";

export type LayoutProps = React.PropsWithChildren<{}>;

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  return (
    <div>
      <NavMenu user={user} onLogoutClick={() => dispatch(logout)} />
      <div className="container-fluid">
        <div className="m-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
