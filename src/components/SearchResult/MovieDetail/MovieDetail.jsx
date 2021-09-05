import React, { useState } from "react";
import "./MovieDetail.styles.scss";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Container, Row, Col } from "react-bootstrap";

export default function MovieDetail(props) {
  console.log("props.detail", props.info);
  const { Rated, Runtime, Actors, Genre, Plot, Ratings } = props.info;
  const { Title, Type, Year, Poster } = props.basic;
  const [watchList, setWatchList] = useState(false);
  // const [collection, setCollection] = useState([]);

  function toggleWatchList() {
    setWatchList((prevValue) => {
      return !prevValue;
    });
    // todo: handle add to watch list array and display later on WatchListPage
    // const item = props.detail;
    // if (watchList) {
    //   setCollection((prevValue) => {
    //     return [...prevValue, props.detail];
    //   });
    //   console.log(collection);
    // }
  }

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <img src={Poster} alt={Title} className="poster" />
        </Col>
        <Col xs={9}>
          <Container>
            <Row>
              <Col xs={8}></Col>
              <Col xs={4}>
                <button
                  value={watchList}
                  onClick={toggleWatchList}
                  className="watchlistBtn"
                >
                  {watchList ? (
                    <BookmarkIcon className="bookmark" />
                  ) : (
                    <BookmarkBorderIcon className="bookmark" />
                  )}
                  Watchlist
                </button>
              </Col>
            </Row>
            <Row className="text-row">
              <Col xs={12} className="detail-title-block">
                <h1 className="detail-title gray-font"> {Title}</h1>
                <div className="detail-row">
                  <p className="detail-rated gray-font ft-20">{Rated}</p>
                  <p className="detail-year gray-font ft-20">{`  ${Year} · ${Genre} · ${Runtime}`}</p>
                </div>
                <p className="detail-actors gray-font ft-20">{Actors}</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <hr />
      <Row>
        <Col>
          <p className="detail-plot gray-font ft-20">{Plot} </p>
        </Col>
      </Row>
      <hr />

      {Ratings ? (
        <Row className="detail-ratings gray-font  ft-20">
          <Col className="detail-rating">
            <h5>{Ratings[0].Value}</h5>
            <p>{Ratings[0].Source}</p>
          </Col>
          <Col>
            <h5>{Ratings[1].Value}</h5>
            <p>{Ratings[1].Source}</p>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}
