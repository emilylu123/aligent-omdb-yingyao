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
    loadMoreMovies,
    hasMore,
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
        <Col xs={5} md={4} className="search-result-list">
          <div className="total-result-counts grey-font">
            {movies.length ? `${movies.length} / ${totalResults}  RESULTS` : ""}
          </div>
          <div>
            <InfiniteScroll
              dataLength={movies.length} //This is important field to render the next data
              next={loadMoreMovies}
              hasMore={hasMore}
              loader={<h4>Loading More...</h4>}
              height={800}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>`Yay! You have seen it all`</b>
                </p>
              }
            >
              {movies.map(({ Title, Year, Type, Poster, imdbID }, index) => {
                if (Year > startY && Year < endY) {
                  return (
                    <MovieItem
                      className={
                        selectId === index
                          ? "movie-item  selected"
                          : "movie-item"
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
          </div>
          {movies.length < totalResults ? (
            <LoadMore loadMoreFn={loadMoreMovies} hasMore={hasMore} />
          ) : (
            <div></div>
          )}
        </Col>
        <Col xs={7} md={8} className="detail-container">
          {movieInfo ? (
            <MovieDetail basic={movies[selectId]} info={movieInfo} />
          ) : (
            <h1>Loading Movie Details...</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
}
