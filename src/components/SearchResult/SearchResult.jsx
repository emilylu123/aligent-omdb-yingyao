import React, { useEffect, useState } from "react";
import "./SearchResult.styles.scss";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieItem from "./MovieItem/MovieItem";
import { Container, Row, Col } from "react-bootstrap";
import LoadMore from "./LoadMore/LoadMore";

import InfiniteScroll from "react-infinite-scroll-component";

export default function SearchResult(props) {
  const {
    searchYearRange: [startY, endY],
    searchType,
    totalResults,
    movies,
    loadMoreFn,
  } = props;

  const [selectId, setSelectId] = useState(0);
  const [imdb, setImdb] = useState("tt0076759");
  const [movieInfo, setMovieInfo] = useState({});

  const API_KEY = "866364e";
  const detailURL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdb}`;

  function handleSelect(id) {
    setSelectId(id);
    setImdb(movies[id].imdbID);
    getMovieDetail();
  }

  const getMovieDetail = async () => {
    try {
      const response = await fetch(detailURL);
      const data = await response.json();
      console.log("getMovieDetail ->", data, typeof data);
      setMovieInfo(data);
    } catch (e) {
      console.error(e.toString);
    }
  };

  useEffect(() => {
    //fetch data from omdb API with imdbId
    setImdb(movies[0].imdbID);
    getMovieDetail();
  }, []);

  return (
    <Container className="search-result-container">
      <Row>
        <Col xs={4} className="search-result-list">
          <InfiniteScroll
            dataLength={movies.length} //This is important field to render the next data
            next={loadMoreFn}
            hasMore={true}
            loader={<h4>Loading More...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {movies.map(({ Title, Year, Type, Poster, imdbID }, index) => {
              if (Year > startY && Year < endY) {
                return (
                  <MovieItem
                    className={
                      selectId === index ? "movie-item  selected" : "movie-item"
                    } // change background color
                    key={index}
                    id={index}
                    title={Title}
                    year={Year}
                    type={Type}
                    imgURL={Poster}
                    onClick={handleSelect}
                  />
                );
              }
            })}
          </InfiniteScroll>
          {movies.length <= totalResults ? (
            <LoadMore
              isLoadingMore={props.isLoadingMore}
              loadMoreFn={props.loadMoreFn}
            />
          ) : (
            <div></div>
          )}
        </Col>
        <Col xs={8}>
          {movieInfo ? (
            <MovieDetail basic={movies[selectId]} info={movieInfo} />
          ) : (
            <div>Loading Movie Details...</div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
