import React from "react";
import "./MovieItem.styles.scss";
import { Container, Row, Col } from "react-bootstrap";

export default function MovieItem(props) {
  const defaultPosterURL =
    "https://allaboutvanya.files.wordpress.com/2012/02/ilovemovies2.jpg";
  const { title, year, imgURL, id } = props;

  return (
    // Executed on click
    <Container className={props.className} onClick={() => props.onClick(id)}>
      <Row>
        <Col xs={3}>
          <img
            src={imgURL !== "N/A" ? imgURL : defaultPosterURL}
            alt="Poster"
          />
        </Col>
        <Col xs>
          <Row>
            <div className="movie-name">{title}</div>
          </Row>
          <Row>
            <div className="year">{year}</div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
