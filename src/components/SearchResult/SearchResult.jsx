import React, { useEffect, useState } from "react";
import "./SearchResult.styles.scss";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieItem from "./MovieItem/MovieItem";
import { Container, Row, Col } from "react-bootstrap";
import LoadMore from "./LoadMore/LoadMore";

import InfiniteScroll from "react-infinite-scroll-component";

export default function SearchResult(props) {
  const {
    totalResults,
    searchYearRange: [startY, endY],
    searchType,
    movies,
    loadMoreFn,
    isLoadingMore,
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
      console.log("data->", data, typeof data);
      setMovieInfo(data);
    } catch (e) {
      console.error(e.toString);
    }
  };

  useEffect(() => {
    //fetch data from api
    setImdb(movies[0].imdbID);
    getMovieDetail();
    console.log("movieInfo", movieInfo);
  }, []);

  return (
    <Container className="search-result-container">
      <Row>
        <Col xs={4} className="search-result-list">
          <p className="total-result-counts">{totalResults} RESULTS</p>

          <InfiniteScroll
            dataLength={movies.length} //This is important field to render the next data
            next={loadMoreFn}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {/* {movies} */}
            {movies.map(({ Title, Year, Type, Poster, imdbID }, index) => {
              if (Year > startY && Year < endY) {
                return (
                  <MovieItem
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
          <LoadMore
            isLoadingMore={props.isLoadingMore}
            loadMoreFn={props.loadMoreFn}
          />
        </Col>
        <Col xs={8}>
          {movieInfo ? (
            <MovieDetail basic={movies[selectId]} info={movieInfo} />
          ) : (
            <div>Loading...</div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
