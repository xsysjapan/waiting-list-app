import * as React from "react";
import NavMenu from "./NavMenu";

export type LayoutProps = React.PropsWithChildren<{}>;

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div>
      <NavMenu />
      <div className="container-fluid">{children}</div>
    </div>
  );
};

export default Layout;
