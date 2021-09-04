import React from "react";
import "./Header.styles.scss";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <div className="header">
      <nav>
        <div className="logo">
          <BiCameraMovie className="logo" />
          <span className="title">Open Movie Database</span>
        </div>
        <div className="links">
          <ul>
            <li>
              <NavLink to="/">Search Movie</NavLink>
            </li>
            <li>
              <NavLink to="/watchlist">Watch Lists</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
