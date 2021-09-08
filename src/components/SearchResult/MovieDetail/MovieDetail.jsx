import React, { useEffect, useState } from "react";
import "./MovieDetail.styles.scss";

import { Container, Row, Col } from "react-bootstrap";
import WatchListSideBar from "../WatchListSideBar/WatchListSideBar";
import AddToWatchList from "./AddToWatchList/AddToWatchList";

export default function MovieDetail(props) {
  const myMovie = props.info;
  const { Rated, Runtime, Actors, Genre, Plot, Ratings } = props.info; // detailed data get from omdb API with imdbId
  const { Title, Year, Poster, imdbID } = props.basic; // basic data get from omdb API with movie title
  const [myCollection, setMyCollection] = useState([]); // collection - save my watchlist(movie detailed info )
  const [watchList, setWatchList] = useState(false); // toggle bookmark tag

  // display default poster when Poster is 'N/A' from omdb API call
  const defaultPosterURL =
    "https://plk.s6img.com/society6/img/bwP7wn9OIz8OA6hivfNNJMjufCw/w_700/posters/top/~artwork,fw_2718,fh_3618,fy_-3,iw_2718,ih_3623/s6-original-art-uploads/society6/uploads/misc/f7aa6773e46147a4a39e223774f8ec28/~~/be-kind-rainbow-posters.jpg";

  useEffect(() => {
    // add dark bookmark if the movie is in the watchList
    console.log(">> useEffect for bookmark");

    setWatchList(containsInMyList(myCollection, myMovie)); // check if in myCollection to set bookmark
    return () => {
      // clean up bookmark tag
      setWatchList(false);
    };
  }, [watchList, myCollection, myMovie]);

  function toggleWatchList() {
    setWatchList((prevValue) => {
      return !prevValue;
    });
    // handle add to watchlist array and display later on WatchListPage
    watchList ? removeFromList() : addToList();
  }

  // handle add obj to watch list array and display later on WatchListPage
  function addToList() {
    setMyCollection((prev) => {
      if (!containsInMyList(myCollection, myMovie)) {
        return [...prev, myMovie];
      }
      console.log("skip for repeated movie");
      return prev;
    });
  }

  // handle remove obj to watch list array and display later on WatchListPage
  function removeFromList() {
    setMyCollection((prev) => {
      if (containsInMyList(myCollection, myMovie)) {
        return prev.filter((item) => {
          return item.imdbID !== imdbID;
        });
      } else {
        return prev;
      }
    });
  }

  function containsInMyList(list, addedItem) {
    let filtered_item = list.filter((item) => {
      return item.imdbID === addedItem.imdbID;
    });
    return !!filtered_item.length;
  }

  return (
    <Container>
      <Row className="main-info">
        <Col md={12} lg={3} xl={{ range: 3, offset: 1 }}>
          <img
            src={Poster !== "N/A" ? Poster : defaultPosterURL}
            alt={Title}
            className="poster"
          />
        </Col>
        <Col md lg={8} xl={8}>
          <Container>
            <Row>
              <Col lg={4}></Col>
              <Col sm={12} md lg>
                <AddToWatchList
                  onClick={toggleWatchList}
                  onWatchList={watchList}
                />
                <WatchListSideBar
                  myCollection={myCollection}
                  placement={"end"} // start, end
                  className="myWatchListBtn"
                />
              </Col>
            </Row>
            <Row className="text-row">
              <Col xs={12}>
                <h1 className="detail-title grey-font"> {Title}</h1>
                <div className="detail-row">
                  <p className="detail-rated grey-font ft-1em">{Rated}</p>
                  <p className="detail-year grey-font ft-1em">{`  ${Year} · ${Genre} · ${Runtime}`}</p>
                </div>
                <p className="detail-actors grey-font ft-1em">{Actors}</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <p className="detail-plot grey-font ft-1em">{Plot} </p>
        </Col>
      </Row>
      <hr />
      {Ratings ? (
        <Row className="detail-ratings">
          {Ratings.length ? (
            <Col className="detail-rating grey-font ft-1em">
              <p className="rating-score">{Ratings[0].Value}</p>
              <p className="rating-source">{Ratings[0].Source}</p>
            </Col>
          ) : null}
          {Ratings.length > 1 ? (
            <Col className="detail-rating grey-font ft-1em">
              <p className="rating-score">{Ratings[1].Value}</p>
              <p className="rating-source">{Ratings[1].Source}</p>
            </Col>
          ) : null}
          {/* 3rd column is optional due to the API rating results length */}
          {Ratings.length > 2 ? (
            <Col className="detail-rating grey-font ft-1em">
              <p className="rating-score">{Ratings[2].Value}</p>
              <p className="rating-source">{Ratings[2].Source}</p>
            </Col>
          ) : null}
        </Row>
      ) : null}
      <hr />

      {/* display my watchlist at the bottom  */}
      <Row>
        <Col className="grey-font ft-1em">
          <p>My movie watch list (Total {myCollection.length} items):</p>
          {myCollection.map((item) => (
            <p key={item.imdbID}>{` ${item.Title} : ${item.Year}`}</p>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
