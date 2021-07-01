import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "./types";

export type NavMenuProps = {
  user: User | undefined;
  onLogoutClick: () => void;
};

export const NavMenu = (props: NavMenuProps) => {
  const { user, onLogoutClick } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid mx-3">
        <Link className="navbar-brand" to="/">
          順番待ちリスト
        </Link>
        {user ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="btn btn-link p-0 nav-link active"
                onClick={onLogoutClick}
              >
                ログアウト
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default NavMenu;
