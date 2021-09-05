import React from "react";
import "./Header.styles.scss";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <nav>
        <div className="logo">
          <BiCameraMovie className="logo" />
          <span className="header">Open Movie Database</span>
        </div>
        <div className="links">
          <ul>
            <li>
              {/* NavLink - renders a navigation link with react-router-dom */}
              <NavLink to="/">Search Movie</NavLink>
            </li>
            <li>
              <NavLink to="/watchlist">My WatchList</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
