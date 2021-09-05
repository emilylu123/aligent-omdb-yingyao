import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.styles.scss";

export default function HomePage() {
  // movies - search results fetching from the omdb API
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  // search - search conditions set from search-bar
  const displayYear = new Date().getFullYear();

  // set default search value
  const [search, setSearch] = useState({
    keyword: "star",
    year: [1970, displayYear],
    type: "", // default type '' - any
  });
  // page - add to URL to load more search results from the omdb API
  const [page, setPage] = useState(1);

  // omdb API_KEY and URL
  const API_KEY = "866364e";
  const listURL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search.keyword}&type=${search.type}&page=${page}`;

  // async function to fetch movie list(array) from OMDB API
  // each movie is shown as {Poster,Title,Type,Year,imdbID}
  const getMovies = async () => {
    try {
      const response = await fetch(listURL);
      const data = await response.json();
      console.log("Get Movie data -from omdb API>>", data);
      if (data.Response === "True") {
        if (!movies.length) {
          console.log("1st time set movies", data.Response);
          setMovies(data.Search);
          setTotalResults(data.totalResults);
        } else {
          handleResult(data);
        }
      }
    } catch (e) {
      console.error(e.toString);
    }
  };

  function loadMore() {
    setPage(page + 1);
    console.log("Loading More movies... Page:", page);
    getMovies();
  }

  function handleResult(result) {
    console.log(
      "in handleResult",
      result.Search,
      result.totalResults,
      result.Response
    );
    console.log("load more movies", movies.length);
    setTotalResults(result.totalResults);

    setMovies((prev) => {
      return prev.concat(result.Search);
    });
  }

  function handleKeyword() {
    setMovies([]);
    setSearch((prev) => {
      return {
        keyword: "",
        year: [1970, displayYear],
        type: "", // default type '' - any
        // year: prev.year,
        // type: prev.type,
      };
    });
    getMovies();
    console.log("reset search keyword");
  }

  function handleChangeYear(value) {
    setSearch((prev) => {
      return {
        keyword: prev.keyword,
        year: value,
        type: prev.type,
      };
    });
  }

  function handleChangeType(e) {
    console.log("handleChangeType", e.target.value);
    setSearch((prev) => {
      return {
        keyword: prev.keyword,
        year: prev.year,
        type: e.target.value,
      };
    });
    getMovies();
  }

  function handleChangeSearch(event) {
    const { name, value } = event.target;

    console.log("handleSearchChange <- ", name, value);
    setSearch((prev) => {
      if (name === "type") {
        return {
          keyword: prev.keyword,
          year: prev.year,
          type: value,
        };
      } else if (name === "keyword") {
        return {
          keyword: value,
          year: prev.year,
          type: prev.type,
        };
      }
    });
    console.log("handleSearchChange ->", search);
    getMovies();
  }

  useEffect(() => {
    getMovies(); //fetch data from api
  }, []);

  return (
    <div className="homepage">
      <Container>
        <Row>
          <SearchBar
            className="search-bar"
            search={search}
            onChangeKeyword={handleKeyword}
            onChangeYear={handleChangeYear}
            onChangeSearch={handleChangeSearch}
          />
        </Row>
        <Row>
          {/* render SearchResult if movies is not empty */}
          <Col>
            {movies.length
              ? console.log("movies.length", movies.length, movies)
              : console.log("empty")}
            {movies.length ? (
              <SearchResult
                className="search-result"
                movies={movies}
                totalResults={totalResults}
                searchYearRange={search.year}
                searchType={search.type}
                loadMoreFn={loadMore}
              />
            ) : (
              <div className="empty-keyword">
                <h1>Welcome to OMDB</h1>
                <h3>Please Enter KeyWord to Search Movie</h3>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
