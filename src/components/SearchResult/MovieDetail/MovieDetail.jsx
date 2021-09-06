import React, { useEffect, useState } from "react";
import "./MovieDetail.styles.scss";

import { Container, Row, Col } from "react-bootstrap";
import WatchListSideBar from "../WatchListSideBar/WatchListSideBar";
import AddToWatchList from "./AddToWatchList/AddToWatchList";

export default function MovieDetail(props) {
  const { Rated, Runtime, Actors, Genre, Plot, Ratings } = props.info;
  const { Title, Year, Poster, imdbID } = props.basic;
  const [collection, setCollection] = useState([]);
  const [watchList, setWatchList] = useState(false);
  const defaultPosterURL =
    "https://plk.s6img.com/society6/img/bwP7wn9OIz8OA6hivfNNJMjufCw/w_700/posters/top/~artwork,fw_2718,fh_3618,fy_-3,iw_2718,ih_3623/s6-original-art-uploads/society6/uploads/misc/f7aa6773e46147a4a39e223774f8ec28/~~/be-kind-rainbow-posters.jpg";

  useEffect(() => {
    // add dark bookmark if the movie is in the watchList
    setWatchList(collection.includes(imdbID));
    return () => {
      // clean up bookmark tag
      setWatchList(false);
    };
  }, [imdbID, watchList, collection]);

  function toggleWatchList() {
    setWatchList((prevValue) => {
      return !prevValue;
    });
    // TODO: handle add to watch list array and display later on WatchListPage
    watchList ? removeFromList() : addToList();
  }

  function addToList() {
    setCollection((prev) => {
      if (!collection.includes(imdbID)) {
        return [...prev, imdbID];
      }
      console.log("skip for repeated movie");
      return prev;
    });
  }

  function removeFromList() {
    setCollection((prev) => {
      if (collection.includes(imdbID)) {
        return prev.filter((item) => {
          return item !== imdbID;
        });
      } else {
        return prev;
      }
    });
  }

  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
          <img
            src={Poster !== "N/A" ? Poster : defaultPosterURL}
            alt={Title}
            className="poster"
          />
        </Col>
        <Col md={9}>
          <Container>
            <Row>
              <Col md={6}></Col>
              <Col sm={12} md>
                <AddToWatchList
                  onClick={toggleWatchList}
                  onWatchList={watchList}
                />
                <WatchListSideBar
                  listData={collection}
                  placement={"end"}
                  className="myWatchListBtn"
                />
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
          {Ratings.length ? (
            <Col className="detail-rating grey-font">
              <h4>{Ratings[0].Value}</h4>
              <h5>{Ratings[0].Source}</h5>
            </Col>
          ) : null}
          {Ratings.length > 1 ? (
            <Col className="detail-rating grey-font">
              <h4>{Ratings[1].Value}</h4>
              <h5>{Ratings[1].Source}</h5>
            </Col>
          ) : null}
          {/* 3rd column is optional due to the API rating results */}
          {Ratings.length > 2 ? (
            <Col className="detail-rating grey-font">
              <h4>{Ratings[2].Value}</h4>
              <h5>{Ratings[2].Source}</h5>
            </Col>
          ) : null}
        </Row>
      ) : null}
      <hr />
      <Row>
        <Col className="grey-font">
          <h5>My movie watch list (Total {collection.length} items):</h5>
          {collection.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
