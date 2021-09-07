import React from "react";
import "./MovieItem.styles.scss";
import { Container, Row, Col } from "react-bootstrap";

export default function MovieItem(props) {
  const { title, year, imgURL, id, onClick } = props;

  // use defaultPosterURL if imgURL is not available
  const defaultPosterURL =
    "https://allaboutvanya.files.wordpress.com/2012/02/ilovemovies2.jpg";

  return (
    // Executed on click
    <Container className={props.className} onClick={() => onClick(id)}>
      <Row>
        <Col
          className="d-none d-md-block"
          md={{ span: 6, offset: 3 }}
          lg={{ span: 3, offset: 1 }}
          xxl={{ span: 3, offset: 2 }}
        >
          <img
            className="movie-item-poster  "
            src={imgURL !== "N/A" ? imgURL : defaultPosterURL}
            alt="Poster"
          />
        </Col>
        <Col
          md={{ span: 10, offset: 1 }}
          lg={{ span: 7, offset: 1 }}
          xxl={{ span: 6, offset: 0 }}
        >
          <Row>
            <div className="movie-item-title grey-font">{title}</div>
          </Row>
          <Row>
            <div className="movie-item-year d-none d-md-block">{year}</div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
