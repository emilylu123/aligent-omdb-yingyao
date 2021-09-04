import React from "react";
import "./MovieItem.styles.scss";
import { Grid } from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";

export default function MovieItem(props) {
  const defaultPoster =
    "https://allaboutvanya.files.wordpress.com/2012/02/ilovemovies2.jpg";
  const { title, year, imgURL, id } = props;

  return (
    // Executed on click
    <Container className="movie-item" onClick={() => props.onClick(id)}>
      <Row>
        <Col xs={4}>
          <img src={imgURL !== "N/A" ? imgURL : defaultPoster} alt="Poster" />
        </Col>
        <Col xs>
          <p className="movie-title">{title}</p>
          <p className="year">{year}</p>
        </Col>
      </Row>
    </Container>
  );
}
