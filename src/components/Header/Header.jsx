import React from "react";
import "./Header.styles.scss";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <nav>
        <div className="logo">
          <BiCameraMovie className="logo" />
          <Link to="/">
            <span className="header-title">Open Movie Database</span>
          </Link>
        </div>
        <div className="links">
          <ul>
            <li>
              {/* NavLink - renders a navigation link with react-router-dom */}
              <NavLink to="/" className="header-link">
                Search Movie
              </NavLink>
            </li>
            <li>
              <NavLink to="/watchlist" className="header-link">
                WatchList Page
              </NavLink>
            </li>
            {/* watch list sidebar */}
            {/* <li>
              <WatchListData placement={"end"} className="watch-list-link" />
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}
