import React, { useState } from "react";
import "./MovieDetail.styles.scss";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Container, Row, Col } from "react-bootstrap";

export default function MovieDetail(props) {
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
        <Col xs={12} md={3}>
          <img src={Poster} alt={Title} className="poster" />
        </Col>
        <Col md={9}>
          <Container>
            <Row>
              <Col md={8}></Col>
              <Col sm={12} md={4}>
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
              <Col xs={12}>
                <h1 className="detail-title grey-font"> {Title}</h1>
                <div className="detail-row">
                  <p className="detail-rated grey-font ft-20">{Rated}</p>
                  <p className="detail-year grey-font ft-20">{`  ${Year} · ${Genre} · ${Runtime}`}</p>
                </div>
                <p className="detail-actors grey-font ft-20">{Actors}</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <hr />
      <Row>
        <Col>
          <p className="detail-plot grey-font ft-20">{Plot} </p>
        </Col>
      </Row>
      <hr />

      {Ratings ? (
        <Row className="detail-ratings grey-font">
          <Col className="detail-rating grey-font">
            <h4>{Ratings[0].Value}</h4>
            <h5>{Ratings[0].Source}</h5>
          </Col>
          <Col className="detail-rating grey-font">
            <h4>{Ratings[1].Value}</h4>
            <h5>{Ratings[1].Source}</h5>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}
