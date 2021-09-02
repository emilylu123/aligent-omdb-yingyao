import React from "react";
import { Link } from "react-router-dom";
import './Header.styles.scss'

export default function Header() {
  return (
    <div>
      <h1> Open Movie Database </h1>
      <Link to="/">Search Movie
         </Link>
      <Link to="/watchlist">Watch List</Link>
    </div>
  );
}
