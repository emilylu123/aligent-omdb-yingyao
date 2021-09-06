import React, { useEffect, useState } from "react";
import "./SearchResult.styles.scss";
import { Container, Row, Col } from "react-bootstrap";
import MovieList from "./MovieList/MovieList";
import MovieDetail from "./MovieDetail/MovieDetail";

export default function SearchResult(props) {
  const { search, totalResults, movies, loadMoreMovies, hasMore } = props;

  const [imdb, setImdb] = useState("tt0076759");
  const [selectId, setSelectId] = useState(0);
  const [movieInfo, setMovieInfo] = useState({});

  const API_KEY = "866364e";
  const detailURL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdb}`;

  useEffect(() => {
    //fetch data from omdb API with imdbId
    console.log("(R) UseEffect fetch movie detail ->");
    if (movieInfo.length) {
      setImdb(movies[0].imdbID);
    }
    getMovieDetail();
  }, [imdb]);

  const getMovieDetail = async () => {
    try {
      console.log(">> Render get movie detail ->", imdb);
      const response = await fetch(detailURL);
      const data = await response.json();
      setMovieInfo(data);
    } catch (e) {
      console.error(e.toString);
    }
  };

  function handleSelect(id) {
    setSelectId(id);
    setImdb(movies[id].imdbID);
    getMovieDetail();
  }

  return (
    <Container className="search-result-container">
      <Row>
        <Col xs={5} md={4} className="search-result-list">
          <MovieList
            movies={movies}
            search={search}
            selectId={selectId}
            onSelect={handleSelect}
            totalResults={totalResults}
            loadMoreMovies={loadMoreMovies}
            hasMore={hasMore}
          />
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
