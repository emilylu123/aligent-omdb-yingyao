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
        <Col xs={4}>
          <img src={Poster} alt={Title} className="poster" />
        </Col>
        <Col xs={8}>
          <Container>
            <Row>
              <Col>
                <button
                  value={watchList}
                  onClick={toggleWatchList}
                  className="watchlist"
                >
                  {watchList ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  Watchlist
                </button>
              </Col>
            </Row>
            <Row className="title-block">
              <Col xs={12}>
                <h2 className="title"> {Title}</h2>
                <span className="rated">{Rated}</span>
                <span className="year">{`  ${Year} · ${Genre} · ${Runtime}`}</span>
                <p id="actors">{Actors}</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <hr />
      <Row>
        <Col id="plot">{Plot} </Col>
      </Row>
      <hr />

      {Ratings ? (
        <Row className='ratings'>
          <Col className='rating'>
            <p>{Ratings[0].Value}</p>
            <p>{Ratings[0].Source}</p>
          </Col>
          <Col>
            <p>{Ratings[1].Value}</p>
            <p>{Ratings[1].Source}</p>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}
