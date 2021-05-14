import * as React from "react";
import { Link } from "react-router-dom";

export type NavMenuProps = {};

export const NavMenu = (props: NavMenuProps) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          順番待ちリスト
        </Link>
      </div>
    </nav>
  );
};

export default NavMenu;
