import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <h2>OPEN MOVIE DATABASE</h2>
      <Link to="/">Search Movie</Link>
      <Link to="/watchlist">Watch List</Link>
    </Breadcrumbs>
  );
}
