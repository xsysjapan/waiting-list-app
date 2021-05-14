import * as React from "react";

export type LayoutProps = React.PropsWithChildren<{}>;

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default Layout;
