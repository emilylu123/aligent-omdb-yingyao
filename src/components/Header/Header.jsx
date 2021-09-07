import React from "react";
import "./Header.styles.scss";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function Header() {
  return (
    <Container className="header">
      <nav>
        <Row>
          <Col className="logo" md={12} lg="auto">
            <BiCameraMovie className="logo" />
            <NavLink to="/">
              <span className="header-title">Open Movie Database</span>
            </NavLink>
          </Col>
          <Col className="links d-none d-md-block" md={12} lg="auto">
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
          </Col>
        </Row>
      </nav>
    </Container>
  );
}
